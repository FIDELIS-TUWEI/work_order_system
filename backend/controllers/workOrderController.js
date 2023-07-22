const Workorder = require("../model/workOrder");
const Manager = require("../model/managers");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");

// Create Work Order
const createWorkOrder = asyncHandler (async (req, res, next) => {
    const { priority, title, location, serviceType, category, status, date, reviewed } = req.body;
    const { userId } = req.params;

    try {
        const manager = await Manager.findById(userId);
        const newWorkOrder = await Workorder({
            requestedBy: manager,
            priority,
            title,
            location,
            serviceType,
            category,
            status,
            date,
            reviewed
        });

        const workorders = await newWorkOrder.save();
        manager.workorders.push(newWorkOrder);
        return res.status(201).json({
            success: true,
            data: {
                workorders
            }
        })
    } catch (error) {
        next(error);
    }
});

module.exports = {
    createWorkOrder,
}