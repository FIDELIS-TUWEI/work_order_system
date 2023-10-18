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

        const workOrders = await WorkOrder.find(query)
            .populate("assignedTo", "firstName lastName")
            .populate("requestedBy", "username")
            .populate("location", "locationTitle")
            .populate("category", "categoryTitle")
            .populate("reviewedBy", "firstName lastName")
            .exec();
        res.json(workOrders);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Count Work Orders with Pending status
const countPendingWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const countPending = await WorkOrder.countDocuments({ status: "Pending" });
        res.json({ countPending });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Count Work Orders with In Progress status
const countInProgressWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const countInProgress = await WorkOrder.countDocuments({ status: "In_Progress" });
        res.json({ countInProgress });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Count Work Orders with Completed status
const countCompletedWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const countCompleted = await WorkOrder.countDocuments({ status: "Complete" });
        res.json({ countCompleted });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Count Work Orders with Reviewed status
const countReviewedWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const countReviewed = await WorkOrder.countDocuments({ reviewed: true });
        res.json({ countReviewed });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Count All Work Orders
const countAllWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const totalWorkCount = await WorkOrder.countDocuments();
        res.json({ totalWorkCount });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
})


module.exports = {
    filterWorkStatus,
    countPendingWorkOrders,
    countInProgressWorkOrders,
    countCompletedWorkOrders,
    countReviewedWorkOrders,
    countAllWorkOrders
}
