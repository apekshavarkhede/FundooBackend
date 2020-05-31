var nodemailer = require('nodemailer');
exports.sendEmailFunction = (url, token, payload, callback) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'apekshavarkhede1508@gmail.com',
            pass: 'apeksha9623574706'
        }
    });
    console.log("token==", token)
    var mailOptions = {
        from: process.env.Email,
        to: payload.userEmail,
        subject: 'Sending Email using Node.js',
        text: `${url}/${token}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        console.log("in mail sending")
        if (error) {
            console.log("err in mail sending", error)
            callback(error)
        } else {
            console.log("mail sent")
            callback(null, { data: "mail sent" })
        }
    });
}



