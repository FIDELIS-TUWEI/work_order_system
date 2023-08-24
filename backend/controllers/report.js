const WorkOrder = require("../model/workOrder");
const asyncHandler = require("express-async-handler");


// Pending Work Order
const pendingWorkOrder = asyncHandler (async (req, res, next) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await WorkOrder.find({status: "Pending"}).estimatedDocumentCount();
    try {
        const pending = await WorkOrder.find({status: "Pending"}).populate().select("-completedWork");
        if (!pending) {
            return next(new ErrorResponse("Work Order not found", 404));
        }
        return res.status(200).json({
            success: true,
            data: pending,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
        
});

// In Progress Work Order
const inProgressWorkOrder = asyncHandler (async (req, res, next) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await WorkOrder.find({status: "In_Progress"}).estimatedDocumentCount();
    try {
        const inProgress = await WorkOrder.find({status: "In_Progress"}).populate().select("-completedWork");
        if (!inProgress) {
            return next(new ErrorResponse("Work Order not found", 404));
        }
        return res.status(200).json({
            success: true,
            data: inProgress,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});


const completedWorkOrder = asyncHandler (async (req, res, next) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await WorkOrder.find({status: "Complete"}).estimatedDocumentCount();
    try {
        const workOrder = await WorkOrder.find({status: "Complete"}).populate().select("-completedWork");
        if (!workOrder) {
            return next(new ErrorResponse("Work Order not found", 404));
        }
        return res.status(200).json({
            success: true,
            data: workOrder,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

const reviewWorkOrder = asyncHandler (async (req, res, next) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await WorkOrder.find({status: "Reviewed"}).estimatedDocumentCount();
    try {
        const review = await WorkOrder.find({status: "Reviewed"}).populate().select("-completedWork");
        if (!review) {
            return next(new ErrorResponse("Work Order not found", 404));
        }
        return res.status(200).json({
            success: true,
            data: review,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
})

module.exports = {
    pendingWorkOrder,
    inProgressWorkOrder,
    completedWorkOrder,
    reviewWorkOrder
}
