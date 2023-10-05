const nodeMailer = require("nodemailer");
const { USER, PASS } = require("./env");

const sendEmail = (option) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodeMailer.createTransport({
        // SMTP configuration options here
        service: "gmail",
        auth: {
            user: USER,
            pass: PASS
        }
    });

    // Define the email options
    const emailOptions = {
        from: `workorder.holidayinnnairobi@gmail.com`,
        to: option.email,
        cc:["fideliofidel9@gmail.com", "fidel.tuwei@holidayinnnairobi.com"],
        subject: option.subject,
        text: option.text
    };

    // Send the email
    transporter.sendMail(emailOptions);

};

module.exports = sendEmail;