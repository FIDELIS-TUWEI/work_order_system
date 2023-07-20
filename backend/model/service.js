const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const serviceSchema = new mongoose.Schema({
    serviceType: {
        // Fix, Repair, Replace, Install
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        // Rooms, Open place, Back office, Admin office
        type: String,
        required: true
    },
    category: {
        // Wi-Fi/ Internet, Bulb/ Lights, Paint, Door/ Lock, Hvac panel, Hvac cold/ Hot
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        // Pending, Complete, Inspected
        type: String,
        required: true,
        default: "Pending"
    }
});

module.exports = mongoose.model("Service", serviceSchema);

