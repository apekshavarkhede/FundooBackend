var userModel = require('../Models/userModel');
class UserServices {

    registerServices(data, callback) {
        try {
            userModel.registerUser(data, (err, result) => {
                if (err) {
                    console.log("err in service", err)
                    return callback(err)
                }
                console.log("res from service")
                return callback(null, result)
            })
        }
        catch (err) {
            callback(err)
        }
    }

    async loginService(data) {
        return await userModel.loginUser(data);
    }

    async verifyUserService(data) {
        console.log("in verify user services")
        return await userModel.verifyUser(data);
    }

    async forgetPasswordService(data) {
        console.log("in forget password services", data);
        return await userModel.forgetPassword(data)

    }

    async changePasswordService(data) {
        console.log("in chasnge passwird services");
        return await userModel.changePassword(data)
    }

    async getAllUsers() {
        return await userModel.getAllUsers()
    }

}

module.exports = new UserServices

