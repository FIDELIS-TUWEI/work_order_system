const mongoose = require("mongoose");
const User = require("./userModel");

// database schema & model
const taskSchema = new mongoose.Schema({
    user: [{
        _id: { type: [mongoose.Schema.Types.ObjectId], ref: User },
        username: { type: String, ref: User }
        
    }],
    issue:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    date : Date
}, {
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;