// eslint-disable-next-line import/named
import { defineApolloClient } from '@nuxtjs/apollo'

export default defineApolloClient({
  httpEndpoint: 'http://localhost/graphql',
  // browserHttpEndpoint: '',
  // wsEndpoint: '',
  // httpLinkOptions: {},
  // wsLinkOptions: {},
  // wsEndpoint: '',
  // websocketsOnly: false,
  // connectToDevTools: false,
  // defaultOptions: {},
  // inMemoryCacheOptions: {},
  // tokenName: 'apollo:<client-name>.token',
  // tokenStorage: 'cookie',
  // authType: 'Bearer',
  // authHeader: 'Authorization',
})
