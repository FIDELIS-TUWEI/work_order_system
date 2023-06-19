const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")("mongoose");

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    workIdentified: {
        type: String,
        required: true, 
    },
    location: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    manager: {
        type: String,
        ref: "User",
        required: [true, "Please enter your name"],
        
    },
    completed: {
        type: String,
        enum: ["Pending", "Complete"],
        required: true,
        default: "Pending"
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