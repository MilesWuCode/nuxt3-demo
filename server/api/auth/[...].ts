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
        // console.log('credentials', credentials)

        // 取得token
        const token = await login(credentials)

        // 取得用戶資料
        const user = await fetchUser(token)

        // 一起放入
        return { udata: { ...user, token } }
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
    jwt: ({ token, user, account }) => {
      // console.log('jwt', token, user, account)

      // 使用signIn()時,user,account才會有資料

      // 判別provider
      if (account && account.provider === 'credentials') {
        // 把user的資料合併token
        token.udata = user ? (user as any).udata || '' : ''

        // 送出jwt
        return Promise.resolve(token)
      }

      // 第三方未完成先傳預設值
      return Promise.resolve(token)
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: ({ session, token }) => {
      // console.log('session', session, token)

      // jwt資料合併到session
      ;(session as any).user = token.udata

      // 送出session
      return Promise.resolve(session)
    },
  },
})

async function login(credentials: any) {
  const { token } = await $fetch('http://localhost/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  })

  return token
}

async function fetchUser(token: string) {
  const { data } = await $fetch('http://localhost/api/me', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

  return data
}
