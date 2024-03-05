const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const workOrderSchema = new mongoose.Schema({
    workOrderNumber: {
        type: String,
        unique: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
        min: [10, "Description must be at least 10 characters long!"],
        max: [20, "Description can only be 20 characters long!"]
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
        enum: ["Fix", "Repair", "Replace", "Install", "Upgrade", "Remove", "Clean", "Prune"],
    },
    category: {
        // Wi-Fi/ Internet, Bulb/ Lights, Paint, Door/ Lock, Hvac panel, Hvac cold/ Hot
        type: ObjectId,
        ref: "Category",
        required: true
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
    checkedBy: {
        type: String,
        default: "Not Checked"
    },
},

{ 
    timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" }, 
}
);


const Counter = mongoose.model('Counter', new mongoose.Schema({//
    _id: { type: String, required: true },
   seq: { type: Number, default: 0 }
}));

async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDocument.seq;
}

workOrderSchema.pre('save', async function(next) {
    if (!this.workOrderNumber) {
        const sequenceValue = await getNextSequenceValue('workOrderNumber');
        this.workOrderNumber = `HINWOS${new Date().getFullYear()}${sequenceValue.toString().padStart(3, '0')}`;
    }
    next();
});

module.exports = mongoose.model("Workorder", workOrderSchema);