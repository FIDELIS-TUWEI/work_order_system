const mongoose = require("mongoose");

const tasksStatSchema = new mongoose.Schema({
    taskId: String,
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