const nodeMailer = require("nodemailer");

const sendEmail = (option) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodeMailer.createTransport({
        // SMTP configuration options here
        service: "gmail",
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
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
    transporter.sendMail(emailOptions);

};

module.exports = sendEmail;