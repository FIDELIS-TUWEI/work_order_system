const mongoose = require("mongoose");

const overallStatSchema = new mongoose.Schema({
    totalTasksAssigned: Number,
    year: Number,
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
    tasksByCatergoty: {
        type: Map,
        of: Number
    },
},
{ timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", overallStatSchema);

module.exports = OverallStat;