const WorkOrder = require("../model/workOrder");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");

// Filter Work Orders
const filterWorkStatus = asyncHandler (async (req, res, next) => {
    // Enable Pagination
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;
    const count = await WorkOrder.find({}).estimatedDocumentCount();

    try {
        const { status } = req.query;
        let query = {};

        if (status) {
            query.status = status;
        };

        const workOrders = await WorkOrder.find(query)
            .populate("assignedTo", "firstName lastName")
            .populate("requestedBy", "username")
            .populate("location", "locationTitle")
            .populate("category", "categoryTitle")
            .populate("reviewedBy", "firstName lastName")
            .sort({ Date_Created: -1 })
            .skip(pageSize * (page -1))
            .limit(pageSize)
            .exec();
        res.status(200).json({
            success: true, 
            data: workOrders, 
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        next(error.message, 500);
    }
});

// Count Work Orders with Pending status
const countPendingWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const countPending = await WorkOrder.countDocuments({ status: "Pending" });
        res.status(200).json({ 
            success: true, 
            data: countPending 
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Count Work Orders with In Progress status
const countInProgressWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const countInProgress = await WorkOrder.countDocuments({ status: "In_Progress" });
        res.status(200).json({ 
            success: true,
            data: countInProgress 
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Count Work Orders with Completed status
const countCompletedWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const countCompleted = await WorkOrder.countDocuments({ status: "Complete" });
        res.status(200).json({ 
            success: true, 
            data: countCompleted 
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Count Work Orders with Reviewed status
const countReviewedWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const countReviewed = await WorkOrder.countDocuments({ reviewed: true });
        res.status(200).json({ 
            success: true, 
            data: countReviewed 
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Count All Work Orders
const countAllWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const totalWorkCount = await WorkOrder.countDocuments();
        res.status(200).json({ 
            success: true,
            data: totalWorkCount 
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});


module.exports = {
    filterWorkStatus,
    countPendingWorkOrders,
    countInProgressWorkOrders,
    countCompletedWorkOrders,
    countReviewedWorkOrders,
    countAllWorkOrders
};
