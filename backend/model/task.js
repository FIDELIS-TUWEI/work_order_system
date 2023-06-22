const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const taskSchema = new mongoose.Schema({
    workIdentified: {
        type: String,
        required: true, 
    },
    location: {
        type: String,
        required: true, 
    },
    //user: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: "User",
    //    required: true
    //},
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    assignedBy: {
        type: String,
        //ref: "User",
        required: [true, "Please enter your name"],
        
    },
    status: {
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