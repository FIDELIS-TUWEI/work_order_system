const mongoose = require("mongoose");

// database schema & model
const taskSchema = new mongoose.Schema({
    userAssigned: { 
        type: String,
        required: true
    },
    workStatus: {
        type: String,
        required: true,
    },
    workIdentified: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    assignedBy: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    date: {
        type: Date,
    }
}, {
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;