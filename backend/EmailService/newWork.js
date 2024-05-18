const ejs = require("ejs");
const path = require("path");
const config = require("../utils/config");
const sendEmail = require("../helpers/sendEmail");
const logger = require("../utils/logger");

const SendNewWorkEmail = async ({workOrderNumber, description, priority, status, serviceType, username}) => {
    const templatePath = path.join(__dirname, "../templates/new.work.ejs");

    ejs.renderFile( 
        templatePath,
        { workOrderNumber, description, priority, status, serviceType, username },
        async (err, data) => {
            let messageOption = {
                from: config.EMAIL,
                to: "fideliofidel9@gmail.com",
                subject: "A new work order request has been created",
                html: data,
            };

            try {
                await sendEmail(messageOption);
            } catch (error) {
                logger.error(err)
            }
        }
    );
};

module.exports = { SendNewWorkEmail };