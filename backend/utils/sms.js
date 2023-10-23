const twilio = require("twilio");

const sendSMS = async (phoneNumber, message) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE;

    const client = twilio(accountSid, authToken);

    try {
        await client.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to: phoneNumber
        });

        console.log(`SMS notification sent to ${phoneNumber}`);
    } catch (error) {
    console.log(`Error sending SMS notification to ${phoneNumber}. Error: ${error.message}`);
    }
};

module.exports = sendSMS;