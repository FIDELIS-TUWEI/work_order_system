const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    title: {
        // Door/ Lock
        type: String,
        trim: true,
        required: true, 
    },
    description: {
        // Additional Information of the work
        type: String,
        trim: true,
        required: [true, "Description is required"],
        maxlength: 500
    },
    location: {
        // Rooms, open places, Back office
        type: String,
        required: true, 
    },
    priority: {
        // High, medium, Low
        type: String,
        required: true
    },
    taskType: {
        // Fix, repair replace
        type: ObjectId,
        ref: "TaskType",
        required: true
    },
    status: {
        // pending complete
        type: Boolean,
        default: false,
        //required: true,
    },
    assignedTo: {
        type: String,
        required: [true, "Please enter your name"],
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);