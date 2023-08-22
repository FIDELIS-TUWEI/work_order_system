const WorkOrder = require("../model/workOrder");


// Get work Order data
const workOrderData = asyncHandler (async (req, res, next) => {
    try {
        const workOrders = await WorkOrder.findById(req.params.id).populate();
        return res.status(200).json({
            success: true,
            data: workOrders
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

module.exports = {
    workOrderData
}
