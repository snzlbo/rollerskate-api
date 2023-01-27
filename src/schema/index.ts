import {
  mutations as UserMutations,
  queries as UserQueries,
  types as UserTypes
} from './users.schema'

export const types = `#graphql
  scalar JSON
  scalar Date

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  ${UserTypes}
`

export const queries = `#graphql
  ${UserQueries}
`

export const mutations = `#graphql
  ${UserMutations}
`

export default { types, queries, mutations };