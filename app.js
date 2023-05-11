const express = require("express");
const cors = require("cors");
const PORT = 3000;

const { ApolloServer } = require("apollo-server-express");

const personTypeDefs = require("./src/graphql/person/typeDefs");
const personResolvers = require("./src/graphql/person/resolvers");
const departmentTypeDefs = require("./src/graphql/department/typeDefs");
const departmentResolvers = require("./src/graphql/department/resolvers");

const server = new ApolloServer({
  typeDefs: [personTypeDefs, departmentTypeDefs],
  resolvers: [personResolvers, departmentResolvers],
});

const app = express();
app.use(cors());

server.start().then(() => {
  server.applyMiddleware({
    app,
    cors: true,
  });
});

app.listen(PORT, () => {
  console.log(
    `GraphQL endpoint and playground accessible at http://localhost:${PORT}${server.graphqlPath}`
  );
});
