const jwt = require('jsonwebtoken')
var redis = require('redis')
var client = redis.createClient();
var decode = require('jwt-claims');

exports.redisAuthentication = (req, res, next) => {
    try {
        console.log("ree.headres", req.headers.authorization);
        // console.log("in redis",req.headers('authorization'));
        const token = req.header('token') || req.headers.authorization || req.params.token
        console.log("token===", req.header('token'));
        var claims = decode(token)
        let user = claims.id;
        console.log("user===", user);

        client.get(user, function (err, response) {
            if (err) {
                return err;
            }
            if (response) {
                jwt.verify(response, process.env.SECRETKEY, (err, res) => {
                    if (err) {
                        return err;
                    }
                    if (res) {
                        req.decoded = res.id;
                        // console.log("keytrt", req.decoded);

                        next();
                        // console.log("after next")
                    }
                })
            }
        })
    }

    catch (err) {
        res.status(400).send({
        })
    }

}
