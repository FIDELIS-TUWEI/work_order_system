const WorkOrder = require("../model/workOrder");
const User = require("../model/user");
const Employee = require("../model/employee");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/email");
const cron = require("node-cron");
const moment = require("moment");
const ErrorResponse = require("../utils/errorRespone");

// Sending email function
const sendEmailNotification = async (WorkOrder, subject, text) => {
    const requestedUser = await User.findById(WorkOrder.requestedBy).select("email");

    if (!requestedUser) {
        console.error("Requested User not found");
        return;
    }
    const engineerEmail = ["solomon.ouma@holidayinnnairobi.com"];
    const ccList = [
        ...engineerEmail, "fidel.tuwei@holidayinnnairobi.com", "ms@holidayinnnairobi.com",
        "allan.kimani@holidayinnnairobi.com", "workshop@holidayinnnairobi.com", 
        "joel.njau@holidayinnnairobi.com", "peter.wangodi@holidayinnnairobi.com"
    ];
    
    const emailOptions = {
        email: requestedUser.email,
        cc: ccList.join(", "),
        subject: subject,
        text: text
    }

    sendEmail(emailOptions);
};

// Create Work Order
const createWorkOrder = asyncHandler (async (req, res, next) => {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    }

    const { priority, description, location, serviceType, category, notes } = req.body;

    try {
        
        // Create Work Order
        const newWorkOrder = await WorkOrder({
            requestedBy: userId,
            priority,
            description,
            location,
            serviceType,
            category,
            notes
        });

        // Save Work Order
        const savedWorkorder = await newWorkOrder.save();

        // Update the user's workOrders array
        await User.findByIdAndUpdate(userId, { $push: { workOrders: savedWorkorder._id }});

        // Send Email notification
        const subject = "NEW WORK ORDER CREATED";
        const emailText = `New Work Order Created with the following details:
            - Description: ${description}
            - Priority: ${priority}
            - Service Type: ${serviceType}
            - Notes: ${notes}
            - Requested By: ${user.username}

            Thank you for using Holiday Inn Work Order System.

            Login to your account to view the work order details.
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
        return next(new ErrorResponse(error.message, 500));
    }
});

// Update Work Order
const updateWorkOrder = asyncHandler (async (req, res, next) => {
    const { id } = req.params;
    const  userId = req.user._id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    };

    try {
        const { assignedTo, reviewed, ...updatedFields } = req.body;

        // Update the work order and populate the assignedTo field
        const updatedWorkOrder = await updateWorkOrderDetails(id, updatedFields);


        // check if any relevant fields were actually updated
        const isUpdated = Object.keys(updatedFields).some(key => updatedFields[key] !== updatedWorkOrder[key]);

        // check if work order exists
        if (!updatedWorkOrder) {
            return next(new ErrorResponse("Work Order not found", 404));
        };

        // Check work order tracker
        if (updatedFields.tracker === "In_Complete") {
            await handleInCompleteWorkOrder(updatedWorkOrder);
        }

        // check if work order is reviewed
        if (reviewed && isUpdated) {
            await handleReviewedWorkOrder(updatedWorkOrder, userId, req);
        };

        // check if an employee is assigned to the work order
        if (assignedTo) {
            await handleAssignedWorkOrder(updatedWorkOrder, assignedTo);
        };

        // Send an email notification
        await sendUpdateEmailNotification(updatedWorkOrder);

        // Return a response
        return res.status(200).json({
            success: true,
            data: updatedWorkOrder
        });

    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

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

    if (updatedFields.reviewed) {
        updatedFields.dateVerified = new Date(); 
    }

    return await WorkOrder.findByIdAndUpdate(id, updatedFields, updateOptions);
};

// Handle Assigned Work Orders
async function handleAssignedWorkOrder (updatedWorkOrder, assignedTo) {
    // update the assignedTo field
    updatedWorkOrder.assignedTo = assignedTo;
    updatedWorkOrder.dateAssigned = new Date();

    await updatedWorkOrder.save();

    // Find the employee and add the work order to their assignedwork array
    const employee = await Employee.findById(assignedTo);
    if (employee) {
        employee.assignedWork.push(updatedWorkOrder._id);
        await employee.save();
    } else {
        throw new Error("Employee not found");
    }
};

// Handle In Complete Work Order tracker
async function handleInCompleteWorkOrder (updatedWorkOrder) {
    const subject = `A WORK ORDER NEEDS YOUR ATTENTION`;
    const text = `The following work order needs your attention:
        - Description: ${updatedWorkOrder.description}
        - Priority: ${updatedWorkOrder.priority}
        - Status: ${updatedWorkOrder.status}
        - Service Type: ${updatedWorkOrder.serviceType}
        - Tracker: ${updatedWorkOrder.tracker}
        - Tracker Message: ${updatedWorkOrder.trackerMessage}
        - Date Updated: ${updatedWorkOrder.Date_Updated}

        Thank you for using Holiday Inn Work Order System.
    `;

    // send email notification
    await sendEmailNotification(updatedWorkOrder, subject, text);

    // Schedule the reversion of the work order status after 10 minutes
    const timeoutId = setTimeout(function () {
        try {
            updatedWorkOrder.status = "Pending";
            updatedWorkOrder.assignedTo = null;
            updatedWorkOrder.tracker = "Not_Attended";
            updatedWorkOrder.trackerMessage = "";
            updatedWorkOrder.dateAssigned = null;
            updatedWorkOrder.dueDate = null;

            // Save the updated work order
            updatedWorkOrder.save();
        } catch (error) {
            throw new Error("Failed to revert work order status", error.message);
        }

    }, 1 * 60 * 1000); // 1 minute in milliseconds

    updatedWorkOrder.timeoutId = timeoutId;
};

// Handle Reviewed Work Order
async function handleReviewedWorkOrder (updatedWorkOrder, userId, req) {
    // Check if the work order has already been reviewed
    if (updatedWorkOrder.reviewed) {
        // If the work order has already been reviewed, do nothing and return
        return;
    }

    // Update the work order only if it hasn't been reviewed
    updatedWorkOrder.reviewed = true;
    updatedWorkOrder.verifiedBy = userId;

    const verifyingUser = await User.findById(userId).select("username")

    if (verifyingUser) {
        updatedWorkOrder.verifiedByUsername = verifyingUser.username || "No username";
    };

    updatedWorkOrder.dateVerified = new Date();
    updatedWorkOrder.verifyComments = req.body.verifyComments;

    // Save the updated work order
    await updatedWorkOrder.save();

    // Update the user's workOrders array
    await User.findByIdAndUpdate(userId, { $push: { workOrders: updatedWorkOrder._id }});

};

// send email notification
async function sendUpdateEmailNotification (updatedWorkOrder) {
    const subject = `A WORK ORDER HAS BEEN UPDATED`;
    const text = `The following details have been updated:
         - Description: ${updatedWorkOrder.description}
         - Status: ${updatedWorkOrder.status}
         - Tracker: ${updatedWorkOrder.tracker}
         - Tracker Message: ${updatedWorkOrder.trackerMessage}
         - Date Updated: ${updatedWorkOrder.Date_Updated}

        Thank you for using Holiday Inn Work Order System.

        Log in to your account to see more details about the updated work order.
    `;

    await sendEmailNotification(updatedWorkOrder, subject, text);
};

// Get all Work Orders
const getAllWorkOrders = asyncHandler (async (req, res, next) => {
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
            .populate("location", "locationTitle")
            .populate("requestedBy", "username")
            .populate("category", "categoryTitle")
            .populate("assignedTo", "firstName lastName")
            .populate("verifiedBy", "username")
            .sort({ Date_Created: -1 })
            .skip(pageSize * (page -1))
            .limit(pageSize);

        if (!workOrders) {
            return next(new ErrorResponse("Work Orders not found", 404));
        };

        return res.status(200).json({
            success: true,
            data: workOrders,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Query All work orders for line graph frontend
const queryAllWork = asyncHandler (async (req, res, next) => {
    try {
        const workOrders = await WorkOrder.find({}).populate("location", "locationTitle")
            .populate("requestedBy", "firstName")
            .populate("category", "categoryTitle")
            .populate("assignedTo", "firstName lastName")
            .populate("verifiedBy", "username")
            .sort({ Date_Created: -1 });

        if (!workOrders) {
            return next(new ErrorResponse("Work Orders not found", 404));
        };

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
        const work = await WorkOrder.findById(workOrderId)
            .populate("requestedBy", "username")
            .populate("location", "locationTitle")
            .populate("category", "categoryTitle")
            .populate("assignedTo", "firstName lastName")
            .populate("verifiedBy", "username")
            .exec();

        if (!work) {
            return next(new ErrorResponse("Work Order not found", 404));
        }

        return res.status(200).json({
            success: true,
            data: work
        });

    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Delete Work Order
const deleteWorkOrder = asyncHandler (async (req, res, next) => {
    try {
        const workOrderId = req.params.id;
        const workOrder = await WorkOrder.findByIdAndDelete(workOrderId).populate("requestedBy", "username");
        if (!workOrder) {
            return next(new ErrorResponse("Work Order not found", 404));
        }

        // user who deleted the work
        const deletedByUser = req.user;

        // Remove the deleted work order from the user's workOrders array
        await User.findByIdAndUpdate(deletedByUser._id, { $pull: { workOrders: workOrderId }});

        // Send Email Notification
        const subject = `WORK ORDER DELETED`;
        const text = `The work order with description ${workOrder.description} has been deleted by ${deletedByUser.username}`;

        await sendEmailNotification(workOrder, subject, text);

        return res.status(200).json({
            success: true,
            message: "Work Order deleted"
        });
        
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Check Work Orders status and send an email notification everyday at 11 am
cron.schedule("00 11 * * *", async (next) => {
    try {

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
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

module.exports = {
    createWorkOrder,
    updateWorkOrder,
    getAllWorkOrders,
    queryAllWork,
    getSingleWorkOrder,
    deleteWorkOrder,
};