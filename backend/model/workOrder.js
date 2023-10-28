const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const workOrderSchema = new mongoose.Schema({
    requestedBy: {
        type: ObjectId,
        ref: "User",
        required: true
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
    description: {
        type: String,
        required: true,
        min: [10, "Description must be at least 10 characters"]
    },
    location: {
        // Rooms, Open place, Back office, Admin office
        type: ObjectId,
        ref: "Location",
        required: true
    },
    serviceType: {
        // Fix, Repair, Replace, Install
        type: String,
        required: true
    },
    category: {
        // Wi-Fi/ Internet, Bulb/ Lights, Paint, Door/ Lock, Hvac panel, Hvac cold/ Hot
        type: ObjectId,
        ref: "Category",
        required: true
    },
    status: {
        // Pending, Complete, Inspected
        type: String,
        required: true,
        enum: ["Pending", "In_Progress" ,"Complete", "Reviewed"],
        default: "Pending"
    },
    assignedTo: {
        type: ObjectId,
        ref: "Employee",
    },
    dateAssigned: {
        type: Object,
        default: ""
    },
    dueDate: {
        type: Object,
        required: [true, "Due Date is required"]
    },
    dateCompleted: {
        type: Object,
        default: ""
    },
    supervisedBy: {
        type: "string",
        default: ""
    },
    comments: {
        type: String,
        default: ""
    },
    reviewed: {
        type: Boolean,
        default: false
    },
    reviewedBy: {
        type: ObjectId,
        ref: "User",
    },
    reviewComments: {
        type: String,
        default: ""
    },
    dateReviewed: {
        type: Object,
        default: ""
    }
},

{ 
    timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" }, 
}
);

module.exports = mongoose.model("Workorder", workOrderSchema);