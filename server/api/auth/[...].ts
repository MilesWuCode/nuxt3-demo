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
        console.log('1.authorize/credentials', credentials)

        // 取得token
        const accessToken = await login(credentials)

        console.log('2.authorize/accessToken', accessToken)

        return { accessToken }
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
      if (user && account) {
        console.log('3.jwt/user,account', user, account)
      }

      // api的token
      let accessToken

      // credentials登入
      if (account && account.provider === 'credentials') {
        accessToken = user ? (user as any).accessToken || undefined : undefined

        console.log('4.jwt/accessToken', accessToken)
      }

      // google登入
      if (account && account.provider === 'google' && account.access_token) {
        accessToken = await socialiteSignIn(
          account.provider,
          account.access_token,
        )
      }

      // 若取得用戶的token
      if (accessToken) {
        // 取得用戶資料
        const fetchUserData = await fetchUser(accessToken)

        // 加到JWT
        token.user = fetchUserData
        token.accessToken = accessToken
      }

      console.log('5.jwt/token', token)

      // 返回JWT
      return Promise.resolve(token)
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: ({ session, token }) => {
      // jwt資料合併到session.user
      session.user = token.user
      session.accessToken = token.accessToken as string

      console.log('6.session/session,token', session, token)

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
