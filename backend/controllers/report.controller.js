const WorkOrder = require("../model/work.order.model");
const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/CustomError");
const logger = require("../utils/logger");

// Filter Work Orders
const filterWorkStatus = asyncHandler(async (req, res) => {
    try {
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
        return res.status(404).json({ error: "Work orders not found!" });
    };

    res.status(200).json({
        workOrders, 
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
    } catch (error) {
        logger.error("Error in filterWorkStatus", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Work orders by tracker Count
const countWorkTracker = asyncHandler ( async (req, res) => {
   try {
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

        res.status(200).json(trackerCounts);
   } catch (error) {
        logger.error("Error in countWorkTracker controller", error);
        res.status(500).json({ error: "Internal Server Error" });
   }

})

// Logic to get work orders created in a day
const workCreatedByDate = asyncHandler (async (req, res) => {
    // pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber || 1);
    const count = await WorkOrder.find({}).estimatedDocumentCount();
    
    const selectedDate = new Date(req.params.selectedDate);
    if (!selectedDate) {
        return res.status(404).json({ error: "Selected date not found!" });
    }

    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

    const workOrders = await WorkOrder.find({ Date_Created: { $gte: startOfDay, $lt: endOfDay } })
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .exec()

    if (!workOrders) {
        return res.status(404).json({ error: "Work orders not found!" });
    }

    res.status(200).json({
        workOrders,
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
});

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
            completed: 0
        };
    
        result.forEach((item) => {
            if (item._id === 'Pending') counts.pending = item.count;
            else if (item._id === 'Complete') counts.completed = item.count;
        });
    
        if (!result) {
            return res.status(404).json({ error: "Work ordeers status not found!" });
        }
    
        res.status(200).json(counts);
    } catch (error) {
        logger.error("Error in countWorkStatus", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Count Total work orders
const countTotalWork = asyncHandler (async (req, res) => {
    try {
        const totalWorkCount = await WorkOrder.countDocuments();
    
        if (!totalWorkCount) {
            return res.status(404).json({ error: "Total work count not found!" });
        }
    
        res.status(200).json(totalWorkCount);

    } catch (error) {
        logger.error("Error in countTotalWork", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = {
    filterWorkStatus,
    countWorkTracker,
    workCreatedByDate,
    countWorkStatus,
    countTotalWork,
};
