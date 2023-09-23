import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "@/apollo/type-defs";
import { resolvers } from "@/apollo/resolvers";
import Cors from 'micro-cors';

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers })

const cors = Cors()
export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})
