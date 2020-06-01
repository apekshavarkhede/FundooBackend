var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
// var bcrypt = require('bcrypt');
var mail = require('../sendEmail')
var redis = require('redis')
var client = redis.createClient()
var mongoosastic = require('mongoosastic')
var els = require('../Services/elstiSearchService')

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, 'firstName required'], length: { min: 3, max: 10 } },
    lastName: { type: String, required: [true, 'lastname required'], length: { min: 3, max: 8 } },
    userEmail: { type: String, required: [true, 'userEmail required'], },
    password: { type: String, required: [true, 'password required'], length: { min: 6, max: 10 } },
    isVerified: { type: "boolean", default: false },
},
    {
        timestamps: true
    });

var user = mongoose.model('user', userSchema, 'user')

class UserModel {

    async registerUser(data, callback) {
        try {
            let result = await user.findOne({ userEmail: data.userEmail })
            console.log("result====", result)
            if (result != null) {
                console.log(data.userEmail)
                callback("email already exists")
            }
            else {
                // data.password = hashpassword(data.password)
                let tokenData = { "userEmail": data.userEmail }
                let token = jwt.sign(tokenData, process.env.SECRETKEY)
                let payload = { "userEmail": data.userEmail };
                let url = `http://localhost:3000/registerVerify`;
                var userData = new user(data);
                userData.save((err, result) => {
                    if (err) {
                        console.log("err in model", err)
                        callback(err)
                    }
                    if (result) {
                        mail.sendEmailFunction(url, token, payload, (err, resultOfSendMail) => {
                            if (err) {
                                callback(err)
                            }
                            else {
                                callback(null, "mail sent check your email")
                            }
                        })

                    }
                })
            }
        }
        catch (err) {
            callback(err)
        }
    }

    async loginUser(data) {
        let result = await user.find({ userEmail: data.userEmail })
        if (result.length > 0) {
            let isPasswordEqual = (data.password === result[0].password)
            if (isPasswordEqual == true) {
                let payload = { id: result[0].id }
                let loginToken = jwt.sign(payload, process.env.SECRETKEY)
                let resultOfSettingToken = await client.set(result[0].id, loginToken)
                if (resultOfSettingToken === true) {
                    console.log("loginToken===", data.userEmail)
                    let responseData = {
                        'token': loginToken,
                        'firstName': result[0].firstName,
                        'lastName': result[0].lastName,
                        'userEmail': data.userEmail
                    }
                    return ({ success: true, message: "login sucess", data: responseData })
                }
                return ({ success: false })
            }
            if (isPasswordEqual === false) {
                return "give correct password"
            }
        }
        return "email not present";
    }

    async verifyUser(data) {
        let result = await user.findOneAndUpdate({ userEmail: data.userEmail }, { $set: { isVerified: true } })
        return new Promise((resolve, reject) => {
            if (result.isVerified == true) {
                console.log("user is verified")
                resolve({ success: true, message: "user verified", data: data })
            }
            if (result.isVerified === false) {
                console.log("err in verifying user model")
                reject({ success: false, message: "err while verifying user", data: data })
            }
        })
    }

    async forgetPassword(data) {
        let result = await user.findOne({ userEmail: data.userEmail })
        console.log("in forget password model", result)
        if (result == null) {
            return "mail not found"
        }
        if (result != null) {
            return new Promise((resolve, reject) => {
                let dataForToken = { "userEmail": data.userEmail }
                let token = jwt.sign(dataForToken, process.env.SECRETKEY)
                let payload = { "userEmail": data.userEmail }
                let url = `http://localhost:3000/changePassword`
                mail.sendEmailFunction(url, token, payload, (err, resultOfEmailSend) => {
                    if (resultOfEmailSend) {
                        resolve({ success: true, message: "mail sent", data: data })
                    }
                    else {
                        reject({ success: false, message: "mail not sent" })
                    }
                })
            })
        }
    }

    async changePassword(data) {
        console.log("in change password models")
        let result = await user.findOneAndUpdate({ userEmail: data.userEmail }, { $set: { password: data.password } })
        console.log("hoooooo", result)
        return new Promise((resolve, reject) => {
            if (result.password == data.password) {
                console.log("password change sucessfully")
                resolve({ success: true, message: "password is change", data: data })
            }
            if (result.password != data.password) {
                console.log("err in change password")
                reject({ success: false, message: "err in change password" })
            }
        })
    }

    async getAllUsers() {
        let result = await user.find()
        return new Promise((resolve, reject) => {
            if (result.length > 0) {
                resolve({ success: true, message: "get all users", data: result })
            }
            if (result.length === 0) {
                reject({ success: "false", message: "no user is present" })
            }
        })
    }

}


module.exports = new UserModel




