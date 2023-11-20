import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Pusher: Pusher
    Echo: Echo
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  console.log('init echo', nuxtApp)

  const config = useRuntimeConfig()

  // @ts-ignore
  window.Pusher = Pusher

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: config.public.pusher.appKey,
    cluster: config.public.pusher.appCluster,
    forceTLS: false,
    wsHost: config.public.pusher.appHost,
    wsPort: config.public.pusher.appPort,

    // 身份驗證位置
    // authEndpoint: import.meta.env.VITE_API_URL + '/broadcasting/auth',

    // 寫死token
    // auth: {
    //   headers: {
    //     Authorization: 'Bearer ' + Cookies.get('token')
    //   }
    // },

    // 重寫可用
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          const { data } = useAuth()

          useFetch('http://localhost/broadcasting/auth', {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + data.value?.user.accessToken,
            },
            body: {
              socket_id: socketId,
              channel_name: channel.name,
            },
          })
            .then((response) => {
              callback(null, response.data)
            })
            .catch((error) => {
              callback(error)
            })
        },
      }
    },
  })
})
