export const types = `#graphql
  type User {
    _id: String! @cacheControl(maxAge: 30)
    firstname: String
    lastname: String
    username: String
    email: String
    role: String
  }

  input RegisterParams {
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    role: String
    password: String!
  }

  input LoginParams {
    email: String!,
    password: String!
  }
`

export const queries = `#graphql
  users(page: Int, perPage: Int, sortField: String, sortDirection: Int): [User]
  userDetails(id: String): User
`

export const mutations = `#graphql
  login(data: LoginParams): String
  logout: String
  register(data: RegisterParams): User
`