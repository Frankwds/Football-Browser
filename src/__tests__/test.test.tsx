
const { ApolloServer, gql } = require("apollo-server-express");
const {createTestClient} = require( "apollo-server-testing");

//import mongoose from "mongoose";

const mongoose = require('mongoose');

const typeDefs = require("./../../server/schema");
const resolvers = require("./../../server/resolvers");

const connectToDb = async () => {
  try {
    console.log("HEIEHEI");  
    await mongoose
  .connect(`mongodb://"amundks":"amundks"@it2810-50.idi.ntnu.no:27017/football-data`),
    { useNewUrlParser: true, useUnifiedTopology: true };
  } catch (error) {
    console.log("ERROR");
  }

}
  

/*


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { query, mutate } = createTestClient(server);

test("find user", async () => {
  const FIND_USER = gql`
    query {
      findUser(id: "1") {
        id
        name
      }
    }
  `;

  const {
    data: { findUser },
  } = await query({ query: FIND_USER });

  expect(findUser).toEqual({ id: "1", name: "Name1" });
});

test("throw error if user is not found", async () => {
  const FIND_USER = gql`
    query {
      findUser(id: "10") {
        id
        name
      }
    }
  `;

  const {
    errors: [error],
  } = await await query({ query: FIND_USER });

  expect(error.message).toEqual("Not Found!");
});

test("delete user", async () => {
  const DELETE_USER = gql`
    mutation ($id: ID!) {
      deleteUser(id: $id)
    }
  `;

  const {
    data: { deleteUser },
  } = await mutate({ mutation: DELETE_USER, variables: { id: "1" } });

  expect(deleteUser).toBeTruthy();
});

test("can not delete user twice", async () => {
  const DELETE_USER = gql`
    mutation ($id: ID!) {
      deleteUser(id: $id)
    }
  `;

  const {
    data: { deleteUser },
  } = await mutate({ mutation: DELETE_USER, variables: { id: "1" } });

  expect(deleteUser).toBeFalsy();
});
*/

export{}

