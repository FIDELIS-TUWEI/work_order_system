const mongoose = require("mongoose")

// database schema & model
const taskSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please add a Task"]
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;