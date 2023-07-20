const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const workOrderSchema = new mongoose.Schema({
    requestedBy: {
        type: ObjectId,
        ref: "Managers"
    },
    priority: {
        // High, Medium, Low
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    reviewed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Workorder", workOrderSchema);