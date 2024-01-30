const WorkOrder = require("../model/workOrder");
const asyncHandler = require("express-async-handler");

// Filter Work Orders
const filterWorkStatus = asyncHandler (async (req, res) => {
    // Enable Pagination
    const pageSize = 10;
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
            .populate("verifiedBy", "firstName lastName")
            .sort({ Date_Created: -1 })
            .skip(pageSize * (page -1))
            .limit(pageSize)
            .exec();

        if (!workOrders) {
            res.status(404);
            throw new Error("Work orders not found");
        };

        res.status(200).json({
            success: true, 
            data: workOrders, 
            page,
            pages: Math.ceil(count / pageSize),
            count
        });

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Logic to get work orders created in a day
const workCreatedByDate = asyncHandler (async (req, res) => {
    // pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber || 1);
    const count = await WorkOrder.find({}).estimatedDocumentCount();
    
    try {
        const selectedDate = new Date(req.params.selectedDate);

        const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

        const workOrders = await WorkOrder.find({ Date_Created: { $gte: startOfDay, $lt: endOfDay } })
            .skip(pageSize * (page - 1))
            .limit(pageSize)
            .exec()

        res.status(200).json({
            success: true,
            data: workOrders,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// Count Work Orders with status using mongoDB aggregation pipeline
const countWorkStatus = asyncHandler (async (req, res) => {
    try {
        const result = await WorkOrder.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                },
            },
        ]);

        const counts = {
            pending: 0,
            inProgress: 0,
            completed: 0
        };

        result.forEach((item) => {
            if (item._id === 'Pending') counts.pending = item.count;
            else if (item._id === 'In_Progress') counts.inProgress = item.count;
            else if (item._id === 'Complete') counts.completed = item.count;
        });

        res.status(200).json({
            success: true,
            data: counts
        });

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Count reviewed work
const countReviewed = asyncHandler (async (req, res) => {
    try {
        const totalReviewed = await WorkOrder.countDocuments({ reviewed: true });

        res.status(200).json({
            success: true,
            data: totalReviewed
        });

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// Count Total work orders
const countTotalWork = asyncHandler (async (req, res) => {
    try {
        const totalWorkCount = await WorkOrder.countDocuments();

        res.status(200).json({
            success: true, 
            data: totalWorkCount
        });

    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
});

module.exports = {
    filterWorkStatus,
    workCreatedByDate,
    countWorkStatus,
    countReviewed,
    countTotalWork,
};
