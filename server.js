var mongo = require('mongodb');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var router = require('./Router/router')
var config = require('./config/config')
var expressValidator = require('express-validator')
// var mongoService = require('./Services/mongooseService');
var mongoService = require('./Services/mongooseService')
var redisService = require('./Services/redisService')
var serachService = require('./Services/elstiSearchService')
serachService.ping()
// const cors = require('cors')
// var cors = require('cors')
var cors = require('cors')
app.use(cors())
const swaggerUi = require('swagger-ui-express')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(expressValidator());
app.use('/', router);
require('dotenv').config();
redisService.redisEvent();
mongoService.mongoose();



var options = {
    explorer: true
};

app.get('/', (req, res) => {
    res.json({ "message": "Hey Hello" });
});


app.listen(3000, (err) => {
    if (err)
        throw err;
    console.log('listening on port 9200');
});


module.exports = app;