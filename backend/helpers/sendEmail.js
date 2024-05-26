const nodeMailer = require("nodemailer");
const config = require("../utils/config");
const logger = require("../utils/logger");

function createTransporter(config) {
    const transporter = nodeMailer.createTransport(config);
    return transporter;
};

let configurations = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    requireTLS: true,
    auth: {
        user: config.EMAIL,
        pass: config.PASSWORD
    }
};


const sendEmail = async(messageOption) => {
    const transporter = await createTransporter(configurations);
    await transporter.verify();
    await transporter.sendMail(messageOption, (error, info) => {
        if (error) {
            logger.error("Error in Send amail service", error);
        }
        logger.info(info.response)
    });
};

module.exports = sendEmail;