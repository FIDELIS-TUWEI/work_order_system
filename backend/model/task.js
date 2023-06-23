const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

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
    WorkLocation: {
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
        
    }
},
{ timestamps: true }
);

taskSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 100
})

const Task = mongoose.model("task", taskSchema);

module.exports = Task;