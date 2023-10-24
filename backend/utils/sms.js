const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "4dbf9139",
  apiSecret: "RVuTInYymk16VVzX"
});

const sendSMS = async (phoneNumber, message) => {
    try {
        const response = await vonage.message.sendSms({
            to: phoneNumber,
            from: "Work Order System",
            text: message
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {sendSMS}