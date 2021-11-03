const { gql } = require("apollo-server-express");

/**
 *  Schema completely describing the set of possible data that can be accessed through queries
 */

const typeDefs = gql`
  type Game {
    id_odsp: String
    link_odsp: String
    adv_stats: String
    date: String
    league: String
    season: String
    country: String
    ht: String
    at: String
    fthg: String
    ftag: String
    odd_h: String
    odd_d: String
    odd_a: String
    odd_over: String
    odd_under: String
    odd_bts: String
    odd_bts_n: String
  }

  type MetaData {
    games: [Game]
    num: Int
  }

  type UserData {
    id_odsp: String
    clicks: Int
    comments: [String]
    ratings: [Int]
  }

  type IncrementClicksResponse {
    id_odsp: String
    clicks: Int
  }

  type Query {
    GetGamesList(page: Int, pageSize: Int): [Game]

    GetGamesFilterList(
      league: String
      country: String
      season: String
      ht: String
      at: String
      page: Int
      pageSize: Int
      param: String
      accending: Boolean
    ): MetaData

    GetGameByID(gameID: String!): Game

    GetGamesByCountry(country: String!, page: Int, pageSize: Int): [Game]

    
  }

  type Mutation {
    incrementClicks(gameID: String!): UserData

    GetUserDataByGameID(gameID: String!): UserData

    commentOnGame(gameID: String!, comment: String!): UserData

    rateGame(gameID: String!, rating: Int!): UserData
  }
`;

module.exports = typeDefs;
