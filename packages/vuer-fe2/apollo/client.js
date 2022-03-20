// src/utils/graphql.js
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default (uri) => {
  return new ApolloClient({
    link: createHttpLink({ uri }),
    cache: new InMemoryCache(),
  })
}
