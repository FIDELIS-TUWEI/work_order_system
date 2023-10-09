const WorkOrder = require("../model/workOrder");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const nodemailer = require("nodemailer");
const { PASS, USER } = require("../utils/env");
const sendEmail = require("../utils/email");
const cron = require("node-cron");

// Create Work Order
const createWorkOrder = asyncHandler (async (req, res, next) => {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    }

    const { priority, title, location, serviceType, category, dueDate } = req.body;

    try {
        
        // Create Work Order
        const newWorkOrder = await WorkOrder({
            requestedBy: userId,
            priority,
            title,
            location,
            serviceType,
            category,
            dueDate
        });

        // Save Work Order
        const savedWorkorder = await newWorkOrder.save();

        // Send Email notification
        const emailOptions = {
            to: ["fidel.tuwei@holidayinnnairobi.com"],
            cc: ["fideliofidel9@gmail.com"],
            subject: `New Work Order Requested\n`,
            text: `
                A New Work order has been Created\n\n
                -----------------------------------\n
                Work Description: ${savedWorkorder.title}\n
                Priority: ${savedWorkorder.priority}\n
                Service Type: ${savedWorkorder.serviceType}\n
                Due Date: ${savedWorkorder.dueDate}\n
                Status: ${savedWorkorder.status}\n
                Date Created: ${savedWorkorder.Date_Created}\n\n
                Login to view more details on the Work Order System\n
                -----------------------------------
            `,
        }

        // Send Email
        sendEmail(emailOptions);

        // Return a response
        return res.status(201).json({
            success: true,
            data: {
                savedWorkorder
            }
        });  
    } catch (error) {
        next(error);
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
        const updateWorkOrder = await WorkOrder.findByIdAndUpdate(id, req.body, { new: true }).populate("reviewedBy", "username");

        // check if work order exists
        if (!updateWorkOrder) {
            return next(new ErrorResponse("Work Order not found", 404));
        };

        // Send Email notification when a work order is updated
        const recepients = ["fidel.tuwei@holidayinnnairobi.com", "fideliofidel9@gmail.com"];
        const subject =`A Work Order updated\n`;
        const text =  `A Work Order with title ${updateWorkOrder.title} has been updated by ${user.firstName} ${user.lastName}. Please login to the Work Order System to view the details.`;
        
        for ( const recepient of recepients ) {
            sendEmail({
                email: recepient,
                subject,
                text
            })
        }

        // Return a response
        return res.status(200).json({
            success: true,
            data: updateWorkOrder
        });

    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Get all Work Orders
const getAllWorkOrders = asyncHandler (async (req, res, next) => {
    // Enable Pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await WorkOrder.find({}).estimatedDocumentCount();
    try {
        const workOrders = await WorkOrder.find({}).populate("location", "locationTitle")
            .populate("requestedBy", "username")
            .populate("category", "categoryTitle")
            .populate("reviewedBy", "username")
            .sort({ Date_Created: -1 })
            .skip(pageSize * (page -1))
            .limit(pageSize);
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

// Get single Work Order
const getSingleWorkOrder = asyncHandler (async (req, res, next) => {
    try {
        const workOrderId = req.params.id;
        const work = await WorkOrder.findById(workOrderId)
            .populate("requestedBy", "username")
            .populate("location", "locationTitle")
            .populate("category", "categoryTitle")
            .exec();
        if (!work) {
            return next(new ErrorResponse("Work Order not found", 404));
        }

        return res.status(200).json({
            success: true,
            data: work
        })
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

        // Send Email Notification
        const userEmail = workOrder.requestedBy.email;
        const ccEmails = ["fidel.tuwei@holidayinnnairobi.com", "fideliofidel9@gmail.com"];

        const emailSubject = `Work Order Deleted`;
        const emailText = `A work order with title ${workOrder.title} has been deleted by ${workOrder.requestedBy.username}.`;

        const emailOptions = {
            email: userEmail,
            cc: ccEmails,
            subject: emailSubject,
            text: emailText
        }

        // Send Email
        sendEmail(emailOptions);

        return res.status(200).json({
            success: true,
            message: "Work Order deleted"
        });
        
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Check Due Date of Work Orders that are due and send an email notification
cron.schedule("0 0 0 * * *", async () => {
    try {
        const currentDate = new Date();

        // Find all work orders with due date less than or equal to the current date
        const overDueWorkOrders = await WorkOrder.find({ 
            dueDate: { $lte: currentDate },
            status: { $in: ["Pending", "In_Progress"] },
        }).populate("requestedBy");

        if (overDueWorkOrders.length > 0) {
            // Loop through overdue work orders and send an email
            for (const workOrder of overDueWorkOrders) {
                const userEmail = workOrder.requestedBy.email;
                const ccEmails = ["fidel.tuwei@holidayinnnairobi.com", "fideliofidel9@gmail.com"];

                const emailSubject = `Work Order Due Date Reminder`;
                const emailText = `Your work order with title ${workOrder.title} has a due date of ${workOrder.dueDate}. Please take action as soon as possible.`;

                // Send the email with cc email addresses
                sendEmail({
                    email: userEmail,
                    cc: ccEmails,
                    subject: emailSubject,
                    text: emailText
                });
            }
            console.log("Emails sent for overdue work orders successfully");
        } else {
            console.log("No overdue work orders found");
        }
    } catch (error) {
        console.error("Error sending email:", error);
    }
});

module.exports = {
    createWorkOrder,
    updateWorkOrder,
    getAllWorkOrders,
    getSingleWorkOrder,
    deleteWorkOrder,
}