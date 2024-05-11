const WorkOrder = require("../model/work.order.model");
const asyncHandler = require("express-async-handler");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");

// Filter Work Orders
const filterWorkStatus = asyncHandler (asyncErrorHandler(async (req, res, next) => {
    // Enable Pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await WorkOrder.find({}).estimatedDocumentCount();

    // Status query
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
        .sort({ Date_Created: -1 })
        .skip(pageSize * (page -1))
        .limit(pageSize)
        .exec();

    if (!workOrders) {
        const error = new CustomError("Work orders not found!", 404);
        return next(error)
    };

    res.status(200).json({
        success: true, 
        data: workOrders, 
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
}));

// Work orders by tracker Count
const countWorkTracker = asyncHandler (asyncErrorHandler ( async (req, res, next) => {
    const result = await WorkOrder.aggregate([
        {
            $group: {
                _id: '$tracker',
                count: { $sum: 1 }
            },
        },
    ]);

    const trackerCounts = {
        not_attended: 0,
        in_attendance: 0,
        in_complete: 0,
        attended: 0
    };

    result.forEach((item) => {
        if (item._id === 'Not_Attended') trackerCounts.not_attended = item.count;
        else if (item._id === 'In_Attendance') trackerCounts.in_attendance = item.count;
        else if (item._id === 'In_Complete') trackerCounts.in_complete = item.count;
        else if (item._id === 'Attended') trackerCounts.attended = item.count;
    });

    res.status(200).json({
        success: true,
        data: trackerCounts
    });

}))

// Logic to get work orders created in a day
const workCreatedByDate = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber || 1);
    const count = await WorkOrder.find({}).estimatedDocumentCount();
    
    const selectedDate = new Date(req.params.selectedDate);
    if (!selectedDate) {
        const error = new CustomError("Selected date not found!", 404);
        return next(error)
    }

    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

    const workOrders = await WorkOrder.find({ Date_Created: { $gte: startOfDay, $lt: endOfDay } })
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .exec()

    if (!workOrders) {
        const error = new CustomError("Work orders not found!", 404);
        return next(error)
    }

    res.status(200).json({
        success: true,
        data: workOrders,
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
}));

// Count Work Orders with status using mongoDB aggregation pipeline
const countWorkStatus = asyncHandler (asyncErrorHandler (async (req, res, next) => {
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
        completed: 0
    };

    result.forEach((item) => {
        if (item._id === 'Pending') counts.pending = item.count;
        else if (item._id === 'Complete') counts.completed = item.count;
    });

    if (!result) {
        const error = new CustomError("Work ordeers status not found!", 404);
        return next(error)
    }

    res.status(200).json({
        success: true,
        data: counts
    });
}));

// Count Total work orders
const countTotalWork = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const totalWorkCount = await WorkOrder.countDocuments();

    if (!totalWorkCount) {
        const error = new CustomError("Total work count not found!", 404);
        return next(error);
    }

    res.status(200).json({
        success: true, 
        data: totalWorkCount
    });
}));

module.exports = {
    filterWorkStatus,
    countWorkTracker,
    workCreatedByDate,
    countWorkStatus,
    countTotalWork,
};
