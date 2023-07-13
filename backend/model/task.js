const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        // Door/ Lock
        type: String,
        trim: true,
        required: true, 
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
    category: {
        // fix, repair, replace
        type: String,
        required: true
    },
    taskType: {
        // Door , Bulb, Wi-Fi
        type: String,
        required: true
    },
    status: {
        // pending complete
        type: String,
        enum: ["Pending", "Complete", "Inspected"],
        default: "Pending",
    },
    assignedTo: {
        type: String,
        required: [true, "Please enter employee name to assign"],
    },
    assignedBy: {
        type: String,
        required: [true, "Enter your name"]
    },
    date: {
        type: String,
        required: true
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);