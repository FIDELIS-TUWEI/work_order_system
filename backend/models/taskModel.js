const mongoose = require("mongoose")

// database schema & model
const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a Task"],
    },
    employeeAssigned: {
        type: String,
        required: [true, "Please enter name"],
    },
    priority: {
        type: String,
        required: [true, "Please enter priority level"],
    },
    location: {
        type: String,
        required: [true, "Enter work location"],
    },
    issueIdentified: {
        type: String,
        required: [true, "What issue has been identified"],
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
    dateCompleted: {
        type: String,
        required: true,
        default: false,
    },
    comments: {
        type: String,
        required: [true, "Please add a comment"],
    },
    authorised: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;