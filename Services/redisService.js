var redis = require("redis");
var client = redis.createClient();

class Redis {
  redisEvent() {
    client.on("connect", function() {
      console.log("redis working");
    });
  }
}

var redisObject = new Redis();
module.exports = redisObject;