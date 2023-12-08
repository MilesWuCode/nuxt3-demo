type FetchResult = {
  token_type: string
  access_token: string
  expires_in: number
}

export default defineNuxtPlugin((nuxtApp) => {
  const { status, data } = useAuth()

  nuxtApp.hook('apollo:auth', ({ client, token }) => {
    if (client === 'default') {
      if (status.value === 'authenticated') {
        token.value = data.value?.user.accessToken || null
      }
    }
  })
})
