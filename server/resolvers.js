const fs = require("fs");

// Import MongoDB data definitions
const { Game, UserData } = require('./models');

/**
 * Resolvers are utilized in such a way that Apollo understands how to populate data for every field in @link {schema.js}
 * That is to say, the resolvers are responsible for populating data in the schema
 */

module.exports = {
  //Query resolvers - defining how data should be retrieved
  Query: {
    GetGamesList: async (_, { page = 0, pageSize = 20 }, ___) => {
      const offset = page * pageSize;
      return await Game.find({}).skip(offset).limit(pageSize).exec()
    },

    GetGamesFilterList: async (
      _,
      {
        league,
        country,
        season,
        ht,
        at,
        page = 0,
        pageSize = 20,
        param = "date",
        accending,
      },
      ___
    ) => {
      offset = page * pageSize;

      let gameData = await Game.find({});

      const data = gameData.filter((game) => {
        if (!league || game.league.includes(league)) {
          if (!country || game.country.includes(country)) {
            if (!season || game.season == season) {
              if (!ht || game.ht.includes(ht)) {
                if (!at || game.at.includes(at)) {
                  return true;
                }
              }
            }
          }
        }
      });

      const len = Object.keys(data).length;

      const sorted = sortBy(data, param, accending);
      const sliced = sorted.slice(offset, offset + pageSize);

      awnser = { games: sliced, num: len };

      return awnser;
    },


    GetGameByID: async (_, { gameID }, ___) => {
      return await Game.findOne({id_odsp : gameID})
    },
    
    GetGamesByCountry: async (_, { country, page = 0, pageSize = 20 }, ___) => {
      const offset = page * pageSize;
      return await Game.find({country: country}).skip(offset).limit(pageSize).exec()
    },
  },



  //Mutation resolver - defining how data should be altered
  Mutation: {
    incrementClicks: async (_, { gameID }, ___) => {
      // Find the game with the correct ID and increment the clicks property
      try {
        let response = await UserData.findOneAndUpdate(
          {id_odsp : gameID}, // Find game
          {$inc: {clicks: 1}}, // Increment by one
          {new: true} // Return new object after incrementing
        )
        return response
      } catch(e) {
        return e.message
      }
    },

    GetUserDataByGameID: async (_, { gameID }, ___) => {
    let userData = await UserData.findOne({id_odsp : gameID})
    // If no data exists --> Generate new data
    
    if (userData == null){
      const gameMeta = { id_odsp: gameID, clicks: 0, comments: [], ratings: [] };
      try {
        let response = await UserData.create(gameMeta)
        return response
      } catch(e) {
        return e.message}
    }
    return userData
    },


    rateGame: async (_, { gameID, rating }, ___) => {
      //Checking if the game has data connected to it, creates an item if it does not.
      let userData = await UserData.findOne({id_odsp : gameID})
      if (userData == null){
        const gameMeta = { id_odsp: gameID, clicks: 0, comments: [], ratings: [rating] };
        try {
          let response = await UserData.create(gameMeta)
          
          return response
        } catch(e) {
          return e.message}
      }
      //If it has data, update it with another rating.
      else{
        try {
          let response = await UserData.findOneAndUpdate(
            {id_odsp : gameID}, // Find game
            {$push: {ratings: rating}}, // Increment by one
            {new: true} // Return new object after incrementing
          )
          return response
        } catch(e) {
          return e.message
        }
      }
    },
  
  commentOnGame: async (_, { gameID, comment }, ___) => {
        //Checking if the game has data connected to it, creates an item if it does not.
        let userData =  await UserData.findOne({id_odsp : gameID})
        if (userData == null){
          const gameMeta = { id_odsp: gameID, clicks: 0, comments: [comment], ratings: [] };
          try {
            let response = await UserData.create(gameMeta)
            return response
          } catch(e) 
            {return e.message}
        }
        //If it has data, update it with another comment.
        try {
          let response = await UserData.findOneAndUpdate(
            {id_odsp : gameID}, // Find game
            {$push: {comments: comment}}, // Increment by one
            {new: true} // Return new object after incrementing
          )
          return response
        } catch(e) {
          return e.message
        }
      },
    },
  
};


const GetSortOrder = (prop, flip) => {
  return function (a, b) {
    if (a[prop].toLowerCase() > b[prop].toLowerCase()) {
      return 1 * flip;
    } else if (a[prop].toLowerCase() < b[prop].toLowerCase()) {
      return -1 * flip;
    }
    return 0;
  };
};

const sortBy = (data, param, accending) => {
  let flip = -1;
  if (accending) {
    flip = 1;
  }
  let copiedData = JSON.parse(JSON.stringify(data));
  copiedData.sort(GetSortOrder(param, flip)); //Pass the attribute to be sorted on
  return copiedData;
};
