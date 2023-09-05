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

        const workOrders = await WorkOrder.find(query);
        res.json(workOrders);
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

module.exports = {
    filterWorkStatus,
}
