const ejs = require("ejs");
const path = require("path");
const sendEmail = require("../helpers/sendEmail");
const logger = require("../utils/logger");

const SendCompleteWorkEmail = async ({ workOrderNumber, description, location, priority, category, status, serviceType, tracker, trackerMessage, dateCompleted, comments, checkedBy, emailOptions }) => {
    const templatePath = path.join(__dirname, "../templates/complete.work.ejs");

    ejs.renderFile(
        templatePath,
        { workOrderNumber, description, location, priority, category, status, serviceType, tracker, trackerMessage, dateCompleted, comments, checkedBy },
        async (err, data) => {
            let messageOption = {
                ...emailOptions,
                subject: "Success: A Work Order has successfully been completed.",
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

module.exports = { SendCompleteWorkEmail };