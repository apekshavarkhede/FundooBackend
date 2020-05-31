var redis = require("redis");
var client = redis.createClient();

exports.resiCache = (req, res, next) => {
  try {
    console.log("e", req.decoded);

    userId = req.decoded;
    client.get(userId + "notes", function(err, data) {
      if (err) {
        return err;
      } else if (data != null) {
        return res.send(JSON.parse(data));
      } else {
        next();
      }
    });
  } catch (er) {
    res.status(400).send({});
  }
};

exports.resiCacheForListing = (req, res, next) => {
  try {
    console.log("req.url==========",);
    var userId = req.decoded;
    client.get(userId + req.key, function(err, data) {
      if (err) {
        return err;
      } else if (data != null) {
        return res.send(JSON.parse(data));
      } else {
        next();
      }
    });
  } catch (err) {
    res.status(400).send({});
  }
};
