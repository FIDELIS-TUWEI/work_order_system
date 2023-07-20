const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const workOrderSchema = new mongoose.Schema({
    requestedBy: {
        type: ObjectId,
        ref: "Manager"
    },
    priority: {
        // High, Medium, Low
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
    serviceType: {
        // Fix, Repair, Replace, Install
        type: String,
        required: true
    },
    category: {
        // Wi-Fi/ Internet, Bulb/ Lights, Paint, Door/ Lock, Hvac panel, Hvac cold/ Hot
        type: String,
        required: true
    },
    status: {
        // Pending, Complete, Inspected
        type: String,
        required: true,
        enum: ["Pending", "Complete", "Inspected"],
        default: "Pending"
    },
    date: {
        type: String,
        required: true,
    },
    reviewed: {
        type: Boolean,
        default: false
    }
},

{ 
    timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" }, 
}
);

module.exports = mongoose.model("Workorder", workOrderSchema);