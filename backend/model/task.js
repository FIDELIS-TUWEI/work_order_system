const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    workIdentified: {
        type: String,
        required: [true, "Please add work identified"]
    },
    location: {
        type: String,
        required: [true, "Please add a work location"]
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        maxlength: 500
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: [true, "Work identified must belong to a category"]
    },
    employeeAssigned: {
        type: String,
        ref: "User",
        required: [true, "Please enter an a Employee to assign"]
    },
    manager: {
        type: ObjectId,
        ref: "User",
        required: [true, "Please enter your name"],
        // Condition to reference only users with a specific role
        match: { role: 1 }
    },
    workStatus: {
        type: String,
        enum: ["Pending", "Complete"],
        required: true,
        default: "Pending"
    },
    date: {
        type: String,
        required: [true, "Please enter a date work was issued"]
    }
},
{ timestamps: true }
);

const Task = mongoose.model("task", taskSchema);

module.exports = Task;