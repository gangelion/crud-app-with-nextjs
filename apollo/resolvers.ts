import { Config } from "apollo-server-micro";

const DB = {
  articles: [
    { id: 1, title: "foo", content: "foooooooooooooo" },
    { id: 2, title: "bar", content: "baaaaaaaaaaaaaa" },
  ],
};

export const resolvers: Config["resolvers"] = {
  Query: {
    getArticles: () => DB.articles,
  },
};
