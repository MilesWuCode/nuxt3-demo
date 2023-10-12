import type { UseFetchOptions } from 'nuxt/app'

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const { data: authData } = useAuth()

  let headers: any = {}

  if (authData.value?.user?.signInToken) {
    headers = {
      Authorization: ('Bearer ' + authData.value?.user?.signInToken) as string,
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