const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    issueIdentified: {
        // Door/ Lock
        type: String,
        required: true, 
    },
    requestedBy: {
        // Name
        type: String,
        required: [true, "Enter your name"]
    },
    workLocation: {
        // Rooms, open places, Back office
        type: String,
        required: true, 
    },
    priority: {
        // High, medium, Low
        type: String,
        required: true
    },
    workState: {
        // Fix, repair replace
        type: String,
        required: true
    },
    description: {
        // Additional Information of the work
        type: String,
        required: true,
        maxlength: 500
    },
    status: {
        // pending complete
        type: String,
        required: true,
    },
    assignedBy: {
        type: String,
        required: [true, "Please enter your name"],
    },
    assignedTo: {
        type: String,
        required: [true, "Please enter an employee name to assign Task."]
    }
},
{ timestamps: true }
);

const Task = mongoose.model("task", taskSchema);

module.exports = Task;