import type { UseFetchOptions } from 'nuxt/app'

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const { data } = useAuth()

  let headers: any = {}

  if (data.value?.user?.accessToken) {
    headers = {
      Authorization: 'Bearer ' + data.value.user.accessToken,
    }
  }

  // if (process.server) {
  //   headers = {
  //     ...headers,
  //     ...useRequestHeaders(['referer', 'cookie']),
  //   }
  // }

  return useFetch('/laravel' + path, {
    headers: {
      // 'X-Requested-With': 'XMLHttpRequest',
      // Accept: 'application/json',
      ...headers,
      ...options?.headers,
    },
    ...options,
  })
}
