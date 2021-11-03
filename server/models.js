const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    id_odsp: String,
    link_odsp: String,
    adv_stats: String,
    date: String,
    league: String,
    season: String,
    country: String,
    ht: String,
    at: String,
    fthg: String,
    ftag: String,
    odd_h: String,
    odd_d: String,
    odd_a: String,
    odd_over: String,
    odd_under: String,
    odd_bts: String,
    odd_bts_n: String
}, {collection : 'gamedata'});

const userDataSchema = new Schema ({
  id_odsp: String,
  clicks: Number,
  comments: [String],
  ratings: [Number],
},{collection: 'userdata'} )

const Game = mongoose.model('game', gameSchema); 
const UserData = mongoose.model('userData', userDataSchema); 

module.exports = {
  Game,
  UserData
};