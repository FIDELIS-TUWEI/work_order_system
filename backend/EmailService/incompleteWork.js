const ejs = require("ejs");
const path = require("path");
const logger = require("../utils/logger");
const sendEmail = require("../helpers/sendEmail");

const SendIncompleteWorkEmail = async ({ workOrderNumber, description, priority, status, serviceType, tracker, trackerMessage, category, location, updatedBy, dateUpdated, emailOptions }) => {
    const templatePath = path.join(__dirname, "../templates/incomplete.work.ejs");

    ejs.renderFile(
        templatePath,
        { workOrderNumber, description, priority, status, serviceType, tracker, trackerMessage, category, location, updatedBy, dateUpdated },
        async (err, data) => {
            let messageOption = {
                ...emailOptions,
                subject: "A Work order requires Attention!", 
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

module.exports = { SendIncompleteWorkEmail };