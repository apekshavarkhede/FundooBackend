const jwt = require('jsonwebtoken')

exports.authentication = (req, res, next) => {
    const token = req.header('token') || req.params.token
    if (token != null) {
        let resultOfVerifyingToken = jwt.verify(token, process.env.SECRETKEY)
        return new Promise((resolve, reject) => {
            if (resultOfVerifyingToken != null) {
                console.log("helooooooo")
                req.body = resultOfVerifyingToken
                console.log("resultOfVerifyingToken===", req.body)
                resolve({ success: true, message: "token verified" })
                next();
                console.log("after next")
            }
            if (resultOfVerifyingToken == null) {
                reject({ success: false, message: "err in verifying the token" })
            }
        })
    }

    else {
        res.status(400).send({
            success: false,
            message: 'No token provided.'
        })
    }
}



exports.authentication1 = (req, res, next) => {
    const token = req.header('token') || req.params.token
    if (token != null) {
        let resultOfVerifyingToken = jwt.verify(token, process.env.SECRETKEY)
        return new Promise((resolve, reject) => {
            if (resultOfVerifyingToken != null) {
                req.body.payload = resultOfVerifyingToken
                resolve({ success: true, message: "token verified" })
                next();
                console.log("after next")
            }
            if (resultOfVerifyingToken == null) {
                reject({ success: false, message: "err in verifying the token" })
            }
        })
    }

    else {
        res.status(400).send({
            success: false,
            message: 'No token provided.'
        })
    }
}
