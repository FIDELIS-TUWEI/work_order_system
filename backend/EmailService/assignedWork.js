const ejs = require("ejs");
const config = require("../utils/config");
const sendEmail = require("../helpers/sendEmail");
const logger = require("../utils/logger");

const SendAssignedWorkEmail = async (workOrderNumber, description, priority, status, serviceType, username, dateAssigned) => {
    ejs.renderFile(__dirname +
        "templates/assigned.work.ejs",
        { workOrderNumber, description, priority, status, serviceType, username, dateAssigned },
        async (err, data) => {
            let messageOption = {
                from: config.EMAIL,
                to: "fideliofidel9@gmail.com",
                subject: "Your work order request has been assigned.",
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