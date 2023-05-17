const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// database schema & model
const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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

// task ticket number
taskSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 1
})

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;