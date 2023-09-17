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
  }
`;
