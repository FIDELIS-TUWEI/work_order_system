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

// Count Work Orders with Pending status
const countPendingWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const count = await WorkOrder.countDocuments({ status: "Pending" });
        res.json({ count });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Count Work Orders with In Progress status
const countInProgressWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const workOrders = await WorkOrder.countDocuments({ status: "In_Progress" });
        res.json(workOrders);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Count Work Orders with Completed status
const countCompletedWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const workOrders = await WorkOrder.countDocuments({ status: "Complete" });
        res.json(workOrders);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Count Work Orders with Reviewed status
const countReviewedWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const workOrders = await WorkOrder.countDocuments({ reviewed: true });
        res.json(workOrders);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
})


module.exports = {
    filterWorkStatus,
    countPendingWorkOrders,
    countInProgressWorkOrders,
    countCompletedWorkOrders,
    countReviewedWorkOrders
}
