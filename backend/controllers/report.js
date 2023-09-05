const WorkOrder = require("../model/workOrder");
const asyncHandler = require("express-async-handler");

// Filter Work Orders
const filterWorkStatus = asyncHandler (async (req, res, next) => {
    try {
        const { status } = req.query;
        let query = {};

        if (status) {
            query.status = status;
        }

        const workOrders = await WorkOrder.find(query);
        res.json(workOrders);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Query to filter work orders by date
const dailyWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dailyWork = await WorkOrder.find({
            Date_Created: {$gte: today}
        });

        res.json(dailyWork);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    } 
});

// Query to filter work orders by week
const weeklyWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Calculate the start date for the current week
        const currentWeekStartDate = new Date(today);
        currentWeekStartDate.setDate(today.getDate() - today.getDay());

        // Filter work orders for the created for the current week (Sunday)
        const weeklyWork = await WorkOrder.find({
            Date_Created: {$gte: currentWeekStartDate}
        });

        res.json(weeklyWork);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});


module.exports = {
    filterWorkStatus,
    dailyWorkOrders,
    weeklyWorkOrders
}
