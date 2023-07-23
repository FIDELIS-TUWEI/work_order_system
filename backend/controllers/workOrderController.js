const WorkOrder = require("../model/workOrder");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");

// Create Work Order
const createWorkOrder = asyncHandler (async (req, res, next) => {
    const { userId, priority, title, location, serviceType, category, date } = req.body;

    try {
        //const user = await User.findById(req.params.id);
        const newWorkOrder = await WorkOrder({
            requestedBy: userId,
            priority,
            title,
            location,
            serviceType,
            category,
            date,
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
        const updatedWorkorder = await WorkOrder.findByIdAndUpdate(workOrderId, updates, {new: true, runValidators: true}).populate("requestedBy", "name username");

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
        const workOrders = await WorkOrder.find({}).populate("requestedBy", "name username");
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
        const workOrder = await WorkOrder.findById(workOrderId).populate("requestedBy", "name username");
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
}