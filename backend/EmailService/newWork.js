const ejs = require("ejs");
const path = require("path");
const sendEmail = require("../helpers/sendEmail");
const logger = require("../utils/logger");

const SendNewWorkEmail = async ({workOrderNumber, description, location, priority, category, status, serviceType, requestedBy, emailOptions}) => {
    const templatePath = path.join(__dirname, "../templates/new.work.ejs");

    ejs.renderFile( 
        templatePath,
        { workOrderNumber, description, location, priority, category, status, serviceType, requestedBy },
        async (err, data) => {
            let messageOption = {
                ...emailOptions,
                subject: "A New Work Order request has been created",
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