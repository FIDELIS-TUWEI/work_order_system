const mongoose = require("mongoose");

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
        enum: ["pending", "complete", "Inspected"],
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
        type: Date,
        required: true
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);