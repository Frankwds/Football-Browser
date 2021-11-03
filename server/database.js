const mongoose = require('mongoose')

// Get username and password for MongoDB access
const loginData = require('./login.json')

// Connect to database
mongoose
    .connect(`mongodb://${loginData.mongoUserPassword}:${loginData.mongoUserPassword}@it2810-50.idi.ntnu.no:27017/football-data`)
    .then( () => {
        console.log('✔️   MongoDB connected successfully at it2810-50.idi.ntnu.no:27017/football-data')
    })
    .catch( () => {
        console.error('❌  Error while connecting to MongoDB');
    })