const mongoose = require("mongoose");

const tasksStatSchema = new mongoose.Schema({
    taskId: {
        type: [mongoose.Types.ObjectId],
    },
    userAssigned: { type: mongoose.Types.ObjectId, ref: "User" },
    monthlyData: [
        {
            month: String,
            totalTasks: Number,
            totalPendingTasks: Number,
            totalCompletedTasks: Number,
        }
    ],
    dailyData: [
        {
            date: String,
            totalTasks: Number,
            totalPendingTasks: Number,
            totalCompletedTasks: Number,
        }
    ],
    weeklyData: [
        {
            week: String,
            totalTasks: Number,
            totalPendingTasks: Number,
            totalCompletedTasks: Number,
        }
    ],
},
{ timestamps: true }
);

const TasksStats = mongoose.model("TasksStats", tasksStatSchema);

module.exports = TasksStats;