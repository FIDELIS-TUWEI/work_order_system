const nodeMailer = require("nodemailer");
const { USER, PASS } = require("./env");

const sendEmail = (options) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodeMailer.createTransport({
        // SMTP configuration options here
        service: "gmail",
        auth: {
            user: USER,
            pass: PASS
        }
    });

};

module.exports = sendEmail;