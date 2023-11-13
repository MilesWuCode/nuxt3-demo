import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string | number
      name: string
      email: string
      avatar: string
      avatar_thumb: string
      email_verified_at: string | null
      provider: string | null
      provider_id: string | null
      accessToken: string
    } & DefaultSession['user']
  }

  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // interface JWT {
  //   /** OpenID ID Token */
  //   idToken?: string
  // }
}
