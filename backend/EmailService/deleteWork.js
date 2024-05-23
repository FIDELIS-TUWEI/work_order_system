const ejs = require("ejs");
const path = require("path");
const logger = require("../utils/logger");
const sendEmail = require("../helpers/sendEmail");

const SendDeletedWorkEmail = async ({ workOrderNumber, description, priority, status, serviceType, tracker, trackerMessage, category, location, deletedBy, dateUpdated, emailOptions }) => {
    const templatePath = path.join(__dirname, "../templates/deleted.work.ejs");

    ejs.renderFile(
        templatePath,
        { workOrderNumber, description, priority, status, serviceType, tracker, trackerMessage, category, location, deletedBy, dateUpdated, emailOptions },
        async (err, data) => {
            let messageOption = {
                ...emailOptions,
                subject: "Removed work order Notification!",
                html: data,
            };

            try {
                await sendEmail(messageOption)
            } catch (error) {
                logger.error(err);
            }
        }
    )
};

module.exports = { SendDeletedWorkEmail };