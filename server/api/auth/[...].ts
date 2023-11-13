import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import LineProvider from 'next-auth/providers/line'
import { NuxtAuthHandler } from '#auth'

// 因為是server執行,使用env參數不用設定在runtimeConfig

type Credential = {
  email: string
  password: string
}

export default NuxtAuthHandler({
  // cookie加密使用
  secret: process.env.AUTH_SECRET,

  // 定義頁面
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: '/login',
  },

  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      // 識別用
      id: 'credentials',

      // 顯示用
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials: Credential) {
        try {
          // 取得token
          const accessToken = await login(credentials)

          const userData = await fetchUser(accessToken)

          const user = { ...userData, accessToken }

          return user
        } catch (error) {
          return null
        }
      },
    }),

    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // @ts-expect-error
    LineProvider.default({
      clientId: process.env.LINE_CLIENT_ID,
      clientSecret: process.env.LINE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({ token, user, account }) => {
      // 使用signIn()時,user,account才會有資料
      // 不然就返回之前取得的JWT

      // credentials登入
      if (user && account && account.provider === 'credentials') {
        token.user = {
          ...user,
        }
      }

      // google登入
      if (account && account.provider === 'google' && account.access_token) {
        // 若取得用戶的token
        const accessToken = await socialiteSignIn(
          account.provider,
          account.access_token,
        )

        // 取得用戶資料
        const userData = await fetchUser(accessToken)

        // 加到JWT
        token.user = { ...userData, accessToken }
      }

      // 返回JWT
      return Promise.resolve(token)
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: ({ session, token }) => {
      // jwt資料合併到session.user
      ;(session as any).user = token.user

      // 送出session
      return Promise.resolve(session)
    },
  },
})

type SocialiteSignInResponse = {
  token: string
}

async function socialiteSignIn(provider: string, providerToken: string) {
  const { token } = await $fetch<SocialiteSignInResponse>(
    `${process.env.API_ENDPOINT}/api/socialite/signin`,
    {
      method: 'POST',
      body: JSON.stringify({
        provider,
        token: providerToken,
      }),
    },
  )

  return token
}

type MeResponse = {
  data: {
    id: number | string
    name: string
    email: string
    avatar: string
    email_verified_at: Date | null
    provider: string | null
    provider_id: string | null
  }
}

async function fetchUser(accessToken: string) {
  const { data } = await $fetch<MeResponse>(
    `${process.env.API_ENDPOINT}/api/me`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    },
  )

  return data
}

type LoginResponse = {
  token: string
}

async function login(credentials: Credential) {
  const { token } = await $fetch<LoginResponse>(
    `${process.env.API_ENDPOINT}/api/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    },
  )

  return token
}
