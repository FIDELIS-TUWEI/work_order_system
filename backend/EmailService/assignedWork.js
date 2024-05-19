const ejs = require("ejs");
const path = require("path");
const sendEmail = require("../helpers/sendEmail");
const logger = require("../utils/logger");

const SendAssignedWorkEmail = async ({workOrderNumber, description, priority, status, location, category, serviceType, assignedTo, dateAssigned, emailOptions}) => {
    const templatePath = path.join(__dirname, "../templates/assigned.work.ejs");

    ejs.renderFile(
        templatePath,
        { workOrderNumber, description, priority, status, location, category, serviceType, assignedTo, dateAssigned },
        async (err, data) => {
            let messageOption = {
                ...emailOptions,
                subject: "A Work order has been assigned.",
                html: data,
            };

            try {
                await sendEmail(messageOption);
            } catch (error) {
                logger.error(err);
            }
        }
    );
};

module.exports = { SendAssignedWorkEmail }