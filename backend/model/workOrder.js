const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const workOrderSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        min: [10, "Description must be at least 10 characters"]
    },
    location: [{
        // Rooms, Open place, Back office, Admin office
        type: ObjectId,
        ref: "Location",
        required: true
    }],
    priority: {
        // Normal, Urgent
        type: String,
        required: true,
        enum: ["Normal", "Urgent"],
    },
    serviceType: {
        // Fix, Repair, Replace, Install, Upgrade, Remove
        type: String,
        required: true,
        enum: ["Fix", "Repair", "Replace", "Install", "Upgrade", "Remove"],
    },
    category: {
        // Wi-Fi/ Internet, Bulb/ Lights, Paint, Door/ Lock, Hvac panel, Hvac cold/ Hot
        type: ObjectId,
        ref: "Category",
        required: true
    },
    notes: {
        type: String,
        required: true,
        min: [10, "Notes description must be at least 10 characters"],
        max: 20
    },
    status: {
        // Pending, Complete
        type: String,
        required: true,
        enum: ["Pending", "Complete"],
        default: "Pending",
        index: true,
    },
    requestedBy: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    tracker: {
        // Not_Attended, In_Attendance, Attended, In_Complete
        type: String,
        required: true,
        enum: ["Not_Attended", "In_Attendance", "In_Complete", "Attended"],
        default: "Not_Attended",
        index: true,
    },
    trackerMessage: {
        type: String,
        default: "No tracker message"
    },
    assignedTo: {
        type: ObjectId,
        ref: "Employee",
    },
    dateAssigned: {
        type: Date,
        index: true
    },
    dueDate: {
        type: Object,
        default: ""
    },
    dateCompleted: {
        type: Date,
        index: true
    },
    supervisedBy: {
        type: String,
        default: "Not supervised"
    },
    comments: {
        type: String,
        default: "No comments"
    },
    reviewed: {
        type: Boolean,
        default: false
    },
    verifiedBy: {
        type: ObjectId,
        ref: "User",
    },
    verifiedByUsername: {
        type: String,
        ref: "User",
        default: "Not Verified",
    },
    verifyComments: {
        type: String,
        default: "No review comments"
    },
    dateVerified: {
        type: Date,
        index: true
    },
},

{ 
    timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" }, 
}
);

module.exports = mongoose.model("Workorder", workOrderSchema);