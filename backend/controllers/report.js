const WorkOrder = require("../model/workOrder");
const asyncHandler = require("express-async-handler");


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
    pendingWorkOrder,
    completedWorkOrder
}
