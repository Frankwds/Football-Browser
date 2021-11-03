const { ApolloServer } = require("apollo-server-express");
const express = require("express")


const startServer = async () => {
  //  Import typeDefs and resolvers for GraphQL-server
  const typeDefs = require("./schema");
  const resolvers = require("./resolvers");

  // Create Apollo server
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start()

  // Apply express to server 
  const app = express()
  await server.applyMiddleware({ app })

  app.listen({port: 4000}, () => {
    console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`);
  })
}

require('./database.js') // Connect to database
startServer()
