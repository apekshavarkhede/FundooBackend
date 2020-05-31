const mongoose = require('mongoose');

var database = require('../config/config')

var databaseUrl = database.url

class MongoServices {
    mongoose() {
        mongoose.connect('mongodb://localhost:27017/FundooNotes', {
            useNewUrlParser: true, useUnifiedTopology: true,
            useFindAndModify: false,
        })
            .then(() => {
                console.log("Database connected");
            }).catch((err) => {
                console.log("Error while connecting to database", err)
            })
    }
}

var mongoService = new MongoServices();
module.exports = mongoService;