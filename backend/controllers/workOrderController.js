const WorkOrder = require("../model/workOrder");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");

// Create Work Order
const createWorkOrder = asyncHandler (async (req, res, next) => {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    }
    const { priority, title, location, serviceType, category, date, time } = req.body;

    try {
        //const user = await User.findById(req.params.id);
        const newWorkOrder = await WorkOrder({
            //requestedBy: userId,
            priority,
            title,
            location,
            serviceType,
            category,
            date,
            time
        });

        const savedWorkorder = await newWorkOrder.save();

        // push savedWorkOrder to the user's workOrders array
        await User.findByIdAndUpdate(userId, { $push: { workOrders: savedWorkorder._id } });
        
        return res.status(201).json({
            success: true,
            data: {
                savedWorkorder
            }
        })
    } catch (error) {
        next(error);
    }
});

// Update Work Order
const updateWorkOrder = asyncHandler (async (req, res, next) => {

    try {
        const workOrderId = req.params.id;
        const updates = req.body;
        const updatedWorkorder = await WorkOrder.findByIdAndUpdate(workOrderId, updates, {new: true, runValidators: true}).populate();

        if (!updatedWorkorder) {
            return next(new ErrorResponse("Work Order not found", 404));
        }

        return res.status(200).json({
            success: true,
            data: updatedWorkorder
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Get all Work Orders
const getAllWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const workOrders = await WorkOrder.find({}).populate();
        return res.status(200).json({
            success: true,
            data: workOrders
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Get single Work Order
const getSingleWorkOrder = asyncHandler (async (req, res, next) => {
    try {
        const workOrderId = req.params.id;
        const work = await WorkOrder.findById(workOrderId);
        if (!work) {
            return next(new ErrorResponse("Work Order not found", 404));
        }
        return res.status(200).json({
            success: true,
            work
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Delete Work Order
const deleteWorkOrder = asyncHandler (async (req, res, next) => {
    try {
        const workOrderId = req.params.id;
        const workOrder = await WorkOrder.findByIdAndDelete(workOrderId).populate("requestedBy", "username");
        if (!workOrder) {
            return next(new ErrorResponse("Work Order not found", 404));
        }

        return res.status(200).json({
            success: true,
            message: "Work Order deleted"
        });
        
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Pending Work Order
const pendingWorkOrder = asyncHandler (async (req, res, next) => {
    try {
        const workOrder = await WorkOrder.find({status: "Pending"}).populate().select("-completedWork");
        if (!workOrder) {
            return next(new ErrorResponse("Work Order not found", 404));
        }
        return res.status(200).json({
            success: true,
            data: workOrder
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
        
});

const completedWorkOrder = asyncHandler (async (req, res, next) => {
    try {
        const workOrder = await WorkOrder.find({status: "Complete"}).populate().select("-completedWork");
        if (!workOrder) {
            return next(new ErrorResponse("Work Order not found", 404));
        }
        return res.status(200).json({
            success: true,
            data: workOrder
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
})

module.exports = {
    createWorkOrder,
    updateWorkOrder,
    getAllWorkOrders,
    getSingleWorkOrder,
    deleteWorkOrder,
    pendingWorkOrder,
    completedWorkOrder
}