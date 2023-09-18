import { gql, Config } from "apollo-server-micro";

export const typeDefs: Config["typeDefs"] = gql`
  type User {
    id: Int
    name: String
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    createUser(name: String!): User!
    editUser(id: Int!, name: String!): User!
    deleteUser(id: Int!): User!
  }
`;
