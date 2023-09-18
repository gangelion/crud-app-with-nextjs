import { PrismaClient } from "@prisma/client";
import { Config } from "apollo-server-micro";

const prisma = new PrismaClient()
export const resolvers: Config["resolvers"] = {
  Query: {
    getUsers: () => prisma.user.findMany(),
  },
  Mutation: {
    createUser: (_, {name}) => {
      return prisma.user.create({
        data: {
          name,
        }
      })
    },
    deleteUser: (_, {id}) => {
      return prisma.user.delete({
        where: { id }
      })
    }
  }
};
