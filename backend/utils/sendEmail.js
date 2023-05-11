const nodemailer = require("nodemailer");

const sendEmail = async(subject, message, send_to, sent_from, reply_to) => {
    // Create Email transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // Options for sending email
    const options = {
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message,
    }

    // Send Email
    transporter.sendMail(options, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })

    // verify connection configuration
    transporter.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take our messages');
        }
    });
};

module.exports = sendEmail;