const WorkOrder = require("../model/workOrder");
const User = require("../model/user");
const Category = require("../model/category");
const Employee = require("../model/employee");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/email");
const cron = require("node-cron");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");
const Location = require("../model/location");

// Sending email function
const sendEmailNotification = async (WorkOrder, subject, text) => {
    const requestedUser = await User.findById(WorkOrder.requestedBy).select("email");

    if (!requestedUser) {
        console.error("Requested User not found");
        return;
    }
    
    // Fetch category details to determine the email recipient list
    const workOrderCategory = await Category.findById(WorkOrder.category).select("categoryTitle");
    let ccList;

    const itCategoryList = [
        "IT", "Room Wi-Fi", "Room-Tv", "Telephone", "Cable Pulling", "Office Printer", 
        "Guest Wi-Fi", "Conference I.T Support", "Office Wi-Fi", "Restaurant Tv", "Onity-lock"
    ].includes(workOrderCategory.categoryTitle);

    if (itCategoryList) {
        ccList = [
            "fidel.tuwei@holidayinnnairobi.com", 
            "joel.njau@holidayinnnairobi.com", "peter.wangodi@holidayinnnairobi.com"
        ];
    } else {
        ccList = [
            "solomon.ouma@holidayinnnairobi.com", "allan.kimani@holidayinnnairobi.com",
            "ms@holidayinnnairobi.com", "workshop@holidayinnnairobi.com", 
        ];
    }

    const emailOptions = {
        email: requestedUser.email,
        cc: ccList.join(", "),
        subject: subject,
        text: text
    }

    sendEmail(emailOptions);
};

// Create Work Order
const createWorkOrder = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");
    
        if (!user) {
            const error = new CustomError("User with ID not found!", 404);
            return next(error);
        }
    
        const { priority, description, location, serviceType, category } = req.body;
    
        // Create Work Order
        const newWorkOrder = await WorkOrder({
            requestedBy: userId,
            priority,
            description,
            location,
            serviceType,
            category,
        });
    
        // Save Work Order
        const savedWorkorder = await newWorkOrder.save();
    
        // Update the user's workOrders array
        await User.findByIdAndUpdate(userId, { $push: { workOrders: savedWorkorder._id }});
    
        // Fetch Location Details
        const locations = await Location.find({ _id: { $in: location } }).select("locationTitle");
        const locationTitles = locations.map(loc => loc.locationTitle).join(', ');
    
        // Fetch category details
        const categories = await Category.find({ _id: { $in: category } }).select("categoryTitle");
        const categoryTitle = categories.map(cat => cat.categoryTitle);
    
        // Send Email notification
        const subject = "NEW WORK ORDER CREATED";
        const emailText = `A New Work with Order number: ${savedWorkorder.workOrderNumber}  has been requested with the following details:
            - Locations: ${locationTitles}
            - Service Type: ${serviceType}
            - Category: ${categoryTitle}
            - Priority: ${priority}
            - Description: ${description}
            - Requested By: ${user.username}
    
            Thank you,
            Holiday Inn Work Order System - All rights reserved.
        `;
    
        await sendEmailNotification(savedWorkorder, subject, emailText);
    
        // Return a response
        return res.status(201).json({
            success: true,
            data: {
                savedWorkorder
            }
        }); 
    } catch (error) {
        return next(error);
    } 
}));

// Update Work Order
const updateWorkOrder = asyncHandler(asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
        return next(new ErrorResponse("User not found",  404));
    }

    const { assignedTo, ...updatedFields } = { ...req.body };
    const updatedWorkOrder = await updateWorkOrderDetails(id, updatedFields);

    if (!updatedWorkOrder) {
        const error = new CustomError("Work order not found!",  404);
        return next(error);
    }

    // Check the user who updated the tracker
    const username = req.user.username

    if (updatedFields.tracker === "In_Complete") {
        await handleInCompleteWorkOrder(updatedWorkOrder, username);
    }

    if (updatedFields.status === "Complete") {
        await sendCompletedEmailNotification(updatedWorkOrder);

        // Update the user's workOrders array
        await User.findByIdAndUpdate(userId, { $push: { workOrders: updatedWorkOrder._id }});
    }

    if (assignedTo) {
        await handleAssignedWorkOrder(updatedWorkOrder, assignedTo);
    }

    return res.status(200).json({
        success: true,
        data: updatedWorkOrder
    });
}));

// Functions broken down to make it easier to update the work order, read the code and debug
async function updateWorkOrderDetails (id, updatedFields) {
    const updateOptions = {
        new: true,
        runValidators: true
    };

    if (updatedFields.assignedTo) {
        updatedFields.dateAssigned = new Date();
    }

    if (updatedFields.status === "Complete") {
        updatedFields.dateCompleted = new Date();
    }

    return await WorkOrder.findByIdAndUpdate(id, updatedFields, updateOptions);
};

// Handle Assigned Work Orders
async function handleAssignedWorkOrder (updatedWorkOrder, assignedTo) {
    // update the assignedTo field
    updatedWorkOrder.assignedTo = assignedTo;
    updatedWorkOrder.dateAssigned = new Date();

    await updatedWorkOrder.save();

    // Send an email notification to the assigned employee
    await sendAssignedEmailNotification(updatedWorkOrder, assignedTo);

    // Find the employee and add the work order to their assignedwork array
    const employee = await Employee.findById(assignedTo);
    if (employee) {
        employee.assignedWork.push(updatedWorkOrder._id);
        await employee.save();
    }
};

async function sendAssignedEmailNotification(updatedWorkOrder, assignedTo) {
    const employee = await Employee.findById(assignedTo);

    const subject = `Work Order Assigned`;
    const text = `The following work order has been assigned:
        - Description: ${updatedWorkOrder.description}
        - Priority: ${updatedWorkOrder.priority}
        - Status: ${updatedWorkOrder.status}
        - Service Type: ${updatedWorkOrder.serviceType}
        - Assigned To: ${employee.firstName} ${employee.lastName}
        - Date Assigned: ${updatedWorkOrder.dateAssigned}

        - Date Updated: ${updatedWorkOrder.Date_Updated}

        Thank you,
        Holiday Inn Work Order System - All rights reserved.
    `;

    await sendEmailNotification(updatedWorkOrder, subject, text);
}

async function sendCompletedEmailNotification(updatedWorkOrder) {
    const locations = await Location.find({ _id: { $in: updatedWorkOrder.location } });
    const locationTitles = locations.map(location => location.locationTitle).join(", ");

    const subject = `Work Order Completed`;
    const text = `The following work order has been completed:
        - Description: ${updatedWorkOrder.description}
        - Status: ${updatedWorkOrder.status}
        - Location(s): ${locationTitles}
        - Date Completed: ${updatedWorkOrder.dateCompleted}
        - Comments: ${updatedWorkOrder.comments}
        - Tracker: ${updatedWorkOrder.tracker}
        - Tracker Message: ${updatedWorkOrder.trackerMessage}
        - Checked By: ${updatedWorkOrder.checkedBy}

        - Date Updated: ${updatedWorkOrder.Date_Updated}

        Thank you,
        Holiday Inn Work Order System - All rights reserved.
    `;

    await sendEmailNotification(updatedWorkOrder, subject, text);
}

// Handle In Complete Work Order tracker
async function handleInCompleteWorkOrder (updatedWorkOrder, username) {
    // Fetch Location Details
    const locations = await Location.find({ _id: { $in: location } }).select("locationTitle");
    const locationTitles = locations.map(loc => loc.locationTitle).join(', ');

    const subject = `A WORK ORDER NEEDS YOUR ATTENTION`;
    const text = `The following work order needs your attention:
        - Description: ${updatedWorkOrder.description}
        - Location: ${locationTitles}
        - Priority: ${updatedWorkOrder.priority}
        - Status: ${updatedWorkOrder.status}
        - Service Type: ${updatedWorkOrder.serviceType}
        - Tracker: ${updatedWorkOrder.tracker}
        - Tracker Message: ${updatedWorkOrder.trackerMessage}
        - Date Updated: ${updatedWorkOrder.Date_Updated}
        - Updated By: ${username}

        Thank you,
        Holiday Inn Work Order System - All rights reserved.
    `;

    // send email notification
    await sendEmailNotification(updatedWorkOrder, subject, text);

    // Schedule the reversion of the work order status after 10 minutes
    const timeoutId = setTimeout(function () {
        updatedWorkOrder.status = "Pending";
        updatedWorkOrder.assignedTo = null;
        updatedWorkOrder.tracker = "Not_Attended";
        updatedWorkOrder.trackerMessage = "";
        updatedWorkOrder.dateAssigned = null;
        updatedWorkOrder.dueDate = null;

        // Save the updated work order
        updatedWorkOrder.save();

    }, 24 * 60 * 1000); // 1 minute in milliseconds

    updatedWorkOrder.timeoutId = timeoutId;
};

// Get all Work Orders
const getAllWorkOrders = asyncHandler(async (req, res, next) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchTerm = req.query.searchTerm || "";
    let query = {};

    if (req.query.status) {
        query.status = req.query.status;
    }

    const count = await WorkOrder.countDocuments(query);

    const workOrders = await WorkOrder.find({...query, workOrderNumber: { $regex: searchTerm, $options: "i" }})
        .populate("location", "locationTitle")
        .populate("requestedBy", "username")
        .populate("category", "categoryTitle")
        .populate("assignedTo", "firstName lastName")
        .sort({ Date_Created: -1 })
        .skip(pageSize * (page - 1))
        .limit(limit)
        .lean();

    if (!workOrders) {
        const error = new CustomError("Work orders not found!", 404);
        return next(error);
    }

    return res.status(200).json({
        success: true,
        data: workOrders,
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
});

// Query All work orders for line graph frontend
const queryAllWork = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const workOrders = await WorkOrder.find({}).populate("location", "locationTitle")
        .populate("requestedBy", "firstName")
        .populate("category", "categoryTitle")
        .populate("assignedTo", "firstName lastName")
        .sort({ Date_Created: -1 });

    if (!workOrders) {
        const error = new CustomError("Work orders not found!", 404);
        return next(error);
    };

    return res.status(200).json({
        success: true,
        data: workOrders
    })
}));

// Find work order with In_Attendance tracker status
const inAttendanceTracker = asyncHandler (asyncErrorHandler (async(req, res, next) => {
    // Enable Pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await WorkOrder.find({}).estimatedDocumentCount();
    const workInAttendance = await WorkOrder.find({ tracker: "In_Attendance" })
        .populate("requestedBy", "username")
        .sort({ Date_Created: -1 })
        .skip(pageSize * (page -1))
        .limit(pageSize)
        .exec();

    if (!workInAttendance) {
        const error = new CustomError("No Work Orders In-attendance found!", 404);
        return next(error);
    }

    return res.status(200).json({
        success: true,
        data: workInAttendance,
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
}));

// Find work order with  In_Complete tracker status
const inCompleteTracker = asyncHandler (asyncErrorHandler (async(req, res, next) => {
    // Enable pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await WorkOrder.find({}).estimatedDocumentCount();

    const workInComplete = await WorkOrder.find({ tracker: "In_Complete" })
        .populate("requestedBy", "username")
        .sort({ Date_Created: -1 })
        .skip(pageSize * (page -1) )
        .limit(pageSize)
        .exec();

    if (!workInComplete) {
        const error = new CustomError("In-complete work data not found!", 404);
        return next(error);
    };

    return res.status(200).json({
        success: true,
        data: workInComplete,
        page,
        pages: Math.ceil(count / pageSize),
        count
    })
}));

// Find work order with Attended tracker status
const attendedTracker = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // Enable Pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await WorkOrder.find({}).estimatedDocumentCount();

    const workAttended = await WorkOrder.find({ tracker: "Attended" })
        .populate("requestedBy", "username")
        .sort({ Date_Created: -1 })
        .skip(pageSize * (page -1))
        .limit(pageSize)
        .exec();
    
        if (!workAttended) {
            const error = new CustomError("No work attended data found!", 404);
            return error;
        };

        return res.status(200).json({
            success: true,
            data: workAttended,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
}))

// Get single Work Order
const getSingleWorkOrder = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const workOrderId = req.params.id;
    const work = await WorkOrder.findById(workOrderId)
        .populate("requestedBy", "username")
        .populate("location", "locationTitle")
        .populate("category", "categoryTitle")
        .populate("assignedTo", "firstName lastName phone")
        .exec();

    if (!work) {
        const error = new CustomError("Work order not found!", 404);
        return next(error)
    }

    return res.status(200).json({
        success: true,
        data: work
    });
}));

// Delete Work Order
const deleteWorkOrder = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const workOrderId = req.params.id;
    const workOrder = await WorkOrder.findByIdAndDelete(workOrderId).populate("requestedBy", "username");

    if (!workOrder) {
        const error = new CustomError("Work order with ID not found!", 404);
        return next(error)
    }

    // user who deleted the work
    const deletedByUser = req.user;

    // Remove the deleted work order from the user's workOrders array
    await User.findByIdAndUpdate(deletedByUser._id, { $pull: { workOrders: workOrderId }});

    // Send Email Notification
    const subject = `WORK ORDER DELETED`;
    const text = `The work order with description ${workOrder.description} has been deleted by ${deletedByUser.username}

        Thank you,
        Holiday Inn Work Order System - All rights reserved.
    `;

    await sendEmailNotification(workOrder, subject, text);

    return res.status(200).json({
        success: true,
        message: "Work Order deleted"
    });
}));

// Check Work Orders status and send an email notification everyday at 11 am
cron.schedule("00 08 * * *", asyncErrorHandler (async (next) => {

    // Find all work orders with status and tracker
    const workOrderStatus = await WorkOrder.find({ 
        status: { $in: ["Pending"] },
        tracker: { $in: ["Not_Attended", "In_Attendance"]},
    }).populate("requestedBy", "username");

    if (workOrderStatus.length > 0) {
        const emailSubject = `Work Order Reminder`;
        let emailText = `The following work orders need your immediate attention. 
        Kindly login and update the details:\n`

        workOrderStatus.forEach((workOrder) => {
            emailText += `\n-Work Order Description: ${workOrder.description}\n`
        });

        // Email addresses
        const engineerEmail = "solomon.ouma@holidayinnnairobi.com"
        const ccEmails = [
                "fidel.tuwei@holidayinnnairobi.com", "allan.kimani@holidayinnnairobi.com",
               "ms@holidayinnnairobi.com", "workshop@holidayinnnairobi.com", 
               "joel.njau@holidayinnnairobi.com", "peter.wangodi@holidayinnnairobi.com"
        ];

        // Send email
        sendEmail({
            email: engineerEmail,
            cc: ccEmails,
            subject: emailSubject,
            text: emailText
        });

    }
}));

module.exports = {
    createWorkOrder,
    updateWorkOrder,
    getAllWorkOrders,
    getWorkOrders,
    queryAllWork,
    inAttendanceTracker,
    inCompleteTracker,
    attendedTracker,
    getSingleWorkOrder,
    deleteWorkOrder,
};