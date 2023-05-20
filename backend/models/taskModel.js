const mongoose = require("mongoose");

// database schema & model
const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    text: {
        type: String,
        default: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;