const WorkOrder = require("../model/workOrder");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");

// Filter Work Orders
const filterWorkStatus = asyncHandler (async (req, res, next) => {
    // Enable Pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await WorkOrder.find({}).estimatedDocumentCount();

    try {
        const { status, selectedDate, dateFilter } = req.query;
        let query = {};

        if (status) {
            query.status = status;
        };

        if (selectedDate && dateFilter) {
            const date = new Date(selectedDate);

            // Depending on the filter("day,", "month", "year"), create the appropriatedate range query
            if (dateFilter === "day") {
                query.Date_Created = {
                    $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                    $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
                }
            } else if (dateFilter === "month") {
                query.Date_Created = {
                    $gte: new Date(date.getFullYear(), date.getMonth()),
                    $lt: new Date(date.getFullYear(), date.getMonth() + 1)
                }
            } else if (dateFilter === "year") {
                query.Date_Created = {
                    $gte: new Date(date.getFullYear()),
                    $lt: new Date(date.getFullYear() + 1)
                }
            }
        }

        const workOrders = await WorkOrder.find(query)
            .populate("assignedTo", "firstName lastName")
            .populate("requestedBy", "username")
            .populate("location", "locationTitle")
            .populate("category", "categoryTitle")
            .populate("reviewedBy", "firstName lastName")
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
