import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import LineProvider from 'next-auth/providers/line'
import { NuxtAuthHandler } from '#auth'

// 因為是server執行,使用env參數不用設定在runtimeConfig

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

      async authorize(credentials: any) {
        console.log('credentials', credentials)

        // 取得token
        const signInToken = await login(credentials)

        return { signInToken }
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
      // console.log('jwt', token, user, account)

      // 使用signIn()時,user,account才會有資料
      // 不然就返回之前取得的JWT

      // api的token
      let signInToken

      // credentials登入
      if (account && account.provider === 'credentials') {
        signInToken = user ? (user as any).signInToken || '' : undefined
      }

      // google登入
      if (account && account.provider === 'google' && account.access_token) {
        signInToken = await socialiteSignIn(
          account.provider,
          account.access_token,
        )
      }

      // 若取得用戶的token
      if (signInToken) {
        // 取得用戶資料
        const fetchUserData = await fetchUser(signInToken)

        // 加到JWT
        token.user = { ...fetchUserData, signInToken }
      }

      // 返回JWT
      return Promise.resolve(token)
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: ({ session, token }) => {
      // console.log('session', session, token)

      // jwt資料合併到session.user
      ;(session as any).user = token.user

      // 送出session
      return Promise.resolve(session)
    },
  },
})

async function socialiteSignIn(provider: string, providerToken: string) {
  try {
    const { token }: { token: string } = await $fetch(
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
  } catch (error) {
    console.log(error)
  }
}

async function fetchUser(token: string) {
  const { data }: { data: any } = await $fetch(
    `${process.env.API_ENDPOINT}/api/me`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  )

  return data
}

async function login(credentials: any) {
  const { token }: { token: string } = await $fetch(
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
