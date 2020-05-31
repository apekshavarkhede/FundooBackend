var userService = require('../Services/userServices')

// class UserController {

exports.registerControl = (req, res) => {
    let responseResult = {};
    try {
        req.checkBody('firstName', 'firstName should be valid').isLength({ min: 3 }),
            req.checkBody('lastName', 'lastName should be valid').isLength({ min: 3 }),
            req.checkBody('userEmail', 'userEmail should be valid').isEmail(),
            req.checkBody('password', 'password should be valid').isLength({ min: 3 })
        var errors = req.validationErrors();
        if (errors) {
            responseResult.err = errors;
            responseResult.status = false;
            res.status(400).send(responseResult)
        }

        if (!errors) {
            userService.registerServices(req.body, (err, result) => {
                if (err) {
                    console.log("err in control", err)
                    responseResult.err = err;
                    responseResult.status = false;
                    res.status(500).send(responseResult)
                }
                else {
                    console.log("sucess")
                    responseResult.data = result;
                    responseResult.status = true;
                    res.status(200).send(responseResult)
                }
            })
        }
    }
    catch (err) {
        responseResult.err = err;
        responseResult.status = false;
        res.status(500).send(responseResult)
    }
}

exports.loginControl = async (req, res) => {
    let responseResult = {};
    try {
        console.log("in login contr")
        let userData = {
            "userEmail": req.body.userEmail,
            "password": req.body.password
        }
        await userService.loginService(userData).then((response) => {
            res.send(response)
        }).catch((err) => {
            res.send(err)
        })

    }
    catch (err) {
        responseResult.err = err;
        responseResult.status = false;
        res.status(500).send(responseResult)
    }
}


exports.verifyUserController = async (req, res) => {
    let responseResult = {};
    try {
        let data = {
            "userEmail": req.body.userEmail
        }
        await userService.verifyUserService(data).then((response) => {
            res.send(response)
        }).catch((err) => {
            res.send(err)
        })
    }
    catch (err) {
        responseResult.err = err;
        responseResult.status = false;
        res.status(500).send(responseResult)
    }
}

exports.forgetPasswordController = async (req, res) => {
    let responseResult = {};
    try {
        let data = {
            "userEmail": req.body.userEmail
        }
        console.log("data in controller====", data)
        await userService.forgetPasswordService(data).then((response) => {
            res.send(response)
        })
    }
    catch (err) {
        responseResult.err = err;
        responseResult.status = false;
        res.status(500).send(responseResult)
    }
}

exports.changePasswordController = async (req, res) => {
    let responseResult = {};
    try {
        let data = {
            "userEmail": req.body.payload.userEmail,
            "password": req.body.password
        }
        console.log("data in controller====", data)
        await userService.changePasswordService(data).then((response) => {
            res.send(response)
        })
    }
    catch (err) {
        responseResult.err = err;
        responseResult.status = false;
        res.status(500).send(responseResult)
    }
}

exports.getAllUserCtrl = async (req, res) => {
    let responseResult = {}
    try {
        await userService.getAllUsers().then((response) => {
            res.send(response)
        })
    } catch (err) {
        responseResult.err = err;
        responseResult.status = false;
        res.status(500).send(responseResult)
    }
}

    // }


    // module.exports = new UserController