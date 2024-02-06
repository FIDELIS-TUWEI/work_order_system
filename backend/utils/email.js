require("dotenv").config();
const nodeMailer = require("nodemailer");
//const { USER, PASS } = require("./env");

const sendEmail = (option) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodeMailer.createTransport({
        // SMTP configuration options here
        host: 'smtp.gmail.com',
        service: "gmail",
        requireTLS: true,
        auth: {
            user: USER || process.env.USER,
            pass: PASS || process.env.PASS
        }
    });
    
    // Define the email options
    const emailOptions = {
        from: `workorder.holidayinnnairobi@gmail.com`,
        to: option.email,
        cc: option.cc,
        subject: option.subject,
        text: option.text
    };

    // Send the email
    transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
            return console.log(`Error Occured: ${error.message}`)
        } else {
            console.info(`Email sent: ${info.response}. Sent at: ${new Date().toISOString()}`);
        }
    });

};

module.exports = sendEmail;