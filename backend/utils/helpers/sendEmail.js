const nodemailer = require("nodemailer");
const savedWorkorder = require("../../controllers/workOrderController");


// send email notification to cheif engineer
// Configure gmail smtp
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

// Function to send Email
const sendMail = async () => {
    try {
        const mailOptions = {
            from: `workorder.holidayinnnairobi@gmail.com`,
            to: `fidel.tuwei@holidayinnnairobi.com`,
            subject: "New Work Order created",
            html: `
                <h2>A new Work Order was created:</h2>\n\n
                <hr>\n
                    <h3>${savedWorkorder.title}</h3>\n
                    <p>${savedWorkorder.location}</p>\n
                    <p>${savedWorkorder.priority}</p>\n
                    <p>${savedWorkorder.category}</p>\n
                    <p>${savedWorkorder.serviceType}</p>\n
            `,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.log("Error sending email:", error);
    }
    
}

module.exports = sendMail;