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
        //await User.findByIdAndUpdate(req.params.id).updateOne({ $push: { workOrders: savedWorkorder } });
        //user.workOrders.push(newWorkOrder);
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

module.exports = {
    createWorkOrder,
}