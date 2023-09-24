import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "@/apollo/type-defs";
import { resolvers } from "@/apollo/resolvers";

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export default apolloServer.createHandler({ path: "/api/graphql" });
