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
        required: true,
        min: [10, "Title must be at least 10 characters"]
    },
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
    serviceType: {
        // Fix, Repair, Replace, Install, Upgrade, Remove
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
        enum: ["Pending", "In_Progress", "Complete", "Reviewed"],
        default: "Pending"
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
        default: ""
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
        type: Date,
        index: true
    },
    dateAdded: {
        type: Date,
        default: Date.now(),
        index: true
    }
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
    if (workOrder.reviewed === true && !workOrder.dateReviewed) {
        workOrder.dateReviewed = new Date();
    };

    next();
});

module.exports = mongoose.model("Workorder", workOrderSchema);