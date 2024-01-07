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
    status: {
        // Pending, Complete, Inspected
        type: String,
        required: true,
        enum: ["Pending", "In_Progress", "Complete", "Reviewed"],
        default: "Pending"
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
        enum: ["Not_Attended", "In_Attendance", "In_Complete", "Attended",],
        default: "Not_Attended",
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

// Pre save hook to set date assigned before save
workOrderSchema.pre("save", async function (next) {
    const workOrder = this;

    // set date assigned if the status is In_Progress and date assigned is not set
    if (workOrder.status === "In_Progress" && !workOrder.dateAssigned) {
        workOrder.dateAssigned = new Date();
    }

    // set date completed if the status is Complete and date completed is not set
    if (workOrder.status === "Complete" && !workOrder.dateCompleted) {
        workOrder.dateCompleted = new Date();
    };

    // set date reviewed if the status is Reviewed and date reviewed is not set
    if (workOrder.reviewed === true && !workOrder.dateVerified) {
        workOrder.dateVerified = new Date();
    };

    next();
});

module.exports = mongoose.model("Workorder", workOrderSchema);