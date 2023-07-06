const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const taskTypeSchema = new mongoose.Schema({
    taskTypeName: {
        // Fix, repair replace
        type: String,
        trim: true,
        required: [true, "Task category is required"],
        maxlength: 40
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true }
);

module.exports = mongoose.model("TaskType", taskTypeSchema);