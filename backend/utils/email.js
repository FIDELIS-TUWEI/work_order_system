const nodeMailer = require("nodemailer");
const { USER, PASS } = require("./env");

const sendEmail = (option) => {
    const { to, cc, subject, text } = option;
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
        to: to.join(", "),
        cc: cc ? cc.join(", ") : undefined,
        subject: subject,
        text: text
    };

    // Send the email
    transporter.sendMail(emailOptions, (err, info) => {
        if (err) {
            console.log("Error sending email", err);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

};

module.exports = sendEmail;