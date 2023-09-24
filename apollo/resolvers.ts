import { PrismaClient } from "@prisma/client";
import { Config } from "apollo-server-micro";

const prisma = new PrismaClient()
export const resolvers: Config["resolvers"] = {
  Query: {
    getUsers: () => prisma.user.findMany({orderBy: {id: 'asc'}}),
  },
  Mutation: {
    createUser: (_, {name}) => {
      return prisma.user.create({
        data: {
          name,
        }
      })
    },
    editUser: (_, {id, name}) => {
      return prisma.user.update({
        where: { id },
        data: { name }
      })
    },
    deleteUser: (_, {id}) => {
      return prisma.user.delete({
        where: { id }
      })
    }
  }
};
