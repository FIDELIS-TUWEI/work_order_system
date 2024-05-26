const ejs = require("ejs");
const path = require("path");
const config = require("../utils/config");
const sendEmail = require("../helpers/sendEmail");
const logger = require("../utils/logger");

const SendWelcomeUserEmail = async ({firstName, lastName, username, email}) => {
    const templatePath = path.join(__dirname, "../templates/welcome.ejs")
    ejs.renderFile(
        templatePath,
        {firstName, lastName, username},
        async (err, data) => {
            let messageOption = {
                from: config.EMAIL,
                to: email,
                cc: ["fidel.tuwei@holidayinnnairobi.com", "fideliofidel9@gmail.com", "peter.wangodi@holidayinnnairobi.com", "joel.njau@holidayinnnairobi.com"],
                subject: "A new user has been registered!",
                html: data,
            };

            try {
                await sendEmail(messageOption);
            } catch (error) {
                logger.error(err)
            }
        }
    )
};

module.exports = { SendWelcomeUserEmail };