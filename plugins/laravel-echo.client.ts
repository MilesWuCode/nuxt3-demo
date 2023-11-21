import Echo from 'laravel-echo'
import Pusher, { Channel } from 'pusher-js'
import type {
  DeprecatedAuthorizerOptions,
  DeprecatedChannelAuthorizer,
} from 'pusher-js/types/src/core/auth/deprecated_channel_authorizer'
import type { ChannelAuthorizationData } from 'pusher-js/types/src/core/auth/options'

declare global {
  interface Window {
    Pusher: Pusher
    Echo: Echo
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  console.log('init echo', nuxtApp)

  const runtimeConfig = useRuntimeConfig()

  // @ts-ignore
  window.Pusher = Pusher

  // https://laravel.com/docs/10.x/sanctum#authorizing-private-broadcast-channels
  window.Echo = new Echo({
    broadcaster: 'pusher',
    cluster: runtimeConfig.public.pusher.appCluster,
    encrypted: true,
    key: runtimeConfig.public.pusher.appKey,
    forceTLS: false,
    wsHost: runtimeConfig.public.pusher.appHost,
    wsPort: runtimeConfig.public.pusher.appPort,

    // 不確定參數
    // disableStats: true,
    // enabledTransports: ['ws', 'wss'],

    // 身份驗證位置
    // authEndpoint: import.meta.env.VITE_API_URL + '/broadcasting/auth',

    // 寫死token
    // auth: {
    //   headers: {
    //     Authorization: 'Bearer ' + Cookies.get('token')
    //   }
    // },

    // 重寫可用
    authorizer: (
      channel: Channel,
      options: DeprecatedAuthorizerOptions,
    ): DeprecatedChannelAuthorizer => {
      return {
        authorize: (socketId, callback) => {
          console.log(options)

          const { data } = useAuth()

          $fetch<{ data: ChannelAuthorizationData }>(
            'http://localhost/broadcasting/auth',
            {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + data.value?.user.accessToken,
              },
              body: {
                socket_id: socketId,
                channel_name: channel.name,
              },
            },
          )
            .then((response) => {
              console.log(response)
              callback(null, response.data)
            })
            .catch((error) => {
              callback(error, null)
            })
        },
      }
    },
  })
})
