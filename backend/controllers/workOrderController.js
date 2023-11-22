const WorkOrder = require("../model/workOrder");
const User = require("../model/user");
const Employee = require("../model/employee");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/email");
const cron = require("node-cron");

// Sending email function
const sendEmailNotification = async (WorkOrder, subject, text) => {
    const recepients = ["fidel.tuwei@holidayinnnairobi.com", "fideliofidel9@gmail.com"];
    
    for (const recepient of recepients) {
        sendEmail({
            email: recepient,
            subject: subject,
            text: text
        });
    }
};

// Create Work Order
const createWorkOrder = asyncHandler (async (req, res, next) => {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    }

    const { priority, title, description, location, serviceType, category } = req.body;

    try {
        
        // Create Work Order
        const newWorkOrder = await WorkOrder({
            requestedBy: userId,
            priority,
            title,
            description,
            location,
            serviceType,
            category,
        });

        // Save Work Order
        const savedWorkorder = await newWorkOrder.save();

        // Update the user's workOrders array
        await User.findByIdAndUpdate(userId, { $push: { workOrders: savedWorkorder._id }});

        // Send Email notification
        const subject = "NEW WORK ORDER CREATED";
        const text = `New Work Order with the following details has been created: \n
        Title: ${title} \n
        Priority: ${priority} \n
        Description: ${description} \n
        Service Type: ${serviceType} \n
        Date Created: ${savedWorkorder.dateAdded} \n
        Thank you for using Holiday Inn Work Order System.
        `;

        await sendEmailNotification(savedWorkorder, subject, text);

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
        const { assignedTo, reviewed, ...updatedFields } = req.body;

        // Update the work order
        const updateOptions = {
            new: true,
            runValidators: true
        };

        // Update the work order and populate the assignedTo field
        const updatedWorkOrder = await WorkOrder.findByIdAndUpdate(id, updatedFields, updateOptions);

        // check if work order exists
        if (!updatedWorkOrder) {
            return next(new ErrorResponse("Work Order not found", 404));
        };

        // Check work order tracker
        if (updatedFields.tracker === "In_Complete") {
            const subject = `A WORK ORDER NEEDS YOUR ATTENTION`;
            const text = `The following work order needs your attention: \n 
            Title: ${updatedWorkOrder.title} \n
            Priority: ${updatedWorkOrder.priority} \n
            Description: ${updatedWorkOrder.description} \n
            Service Type: ${updatedWorkOrder.serviceType} \n
            Date Created: ${updatedWorkOrder.dateAdded} \n
            Thank you for using Holiday Inn Work Order System.
            `;

            await sendEmailNotification(updatedWorkOrder, subject, text);

            // Schedule the reversion of the work order status after 10 minutes
            const timeoutId = setTimeout(function () {
                updatedWorkOrder.status = "Pending";
                updatedWorkOrder.assignedTo = null;
                updatedWorkOrder.tracker = "Not_Attended";
                updatedWorkOrder.trackerMessage = req.body.trackerMessage;
                updatedWorkOrder.dateAssigned = null;
                updatedWorkOrder.dueDate = null;

                // Save the updated work order
                updatedWorkOrder.save();

                clearTimeout(timeoutId);
            }, 1 * 60 * 1000); // 10 minutes in milliseconds

            // Save the updated work order
            updatedWorkOrder.timeoutId = timeoutId;
            await updatedWorkOrder.save();
        }

        // check if work order is reviewed
        if (reviewed) {
            updatedWorkOrder.reviewed = true;
            updatedWorkOrder.reviewedBy = req.body.reviewedBy;
            updatedWorkOrder.dateReviewed = req.body.dateReviewed;
            updatedWorkOrder.reviewComments = req.body.reviewComments;
            await updatedWorkOrder.save();
        } 

        // clear the user who requested the work when the work is reviewed
        if ( reviewed) {
            await User.findByIdAndUpdate(userId, { $pull: { workOrders: id } });
        };

        // check if an employee is assigned to the work order
        if (assignedTo) {
            // update the assignedTo field
            updatedWorkOrder.assignedTo = assignedTo;
            await updatedWorkOrder.save();

            // Find the employee and add the work order to their assignedwork array
            const employee = await Employee.findById(assignedTo);
            if (employee) {
                employee.assignedWork.push(id);
                await employee.save();

            }
        };

        // Send an email notification
        const subject = `A WORK ORDER HAS BEEN UPDATED`;
        const text = `A work order with title ${updatedWorkOrder.title} has been updated by ${user.username}. \n
        Thank you for your using Holiday Inn Work Order System.`;

        await sendEmailNotification(updatedWorkOrder, subject, text);

        // Return a response
        return res.status(200).json({
            success: true,
            data: updatedWorkOrder
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
            .populate("assignedTo", "firstName lastName")
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

// Query All work orders for line graph frontend
const queryAllWork = asyncHandler (async (req, res, next) => {
    try {
        const workOrders = await WorkOrder.find({}).populate("location", "locationTitle")
            .populate("requestedBy", "firstName")
            .populate("category", "categoryTitle")
            .populate("assignedTo", "firstName lastName")
            .populate("reviewedBy", "username")
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
            .populate("reviewedBy", "username")
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

        // user who deleted the work
        const deletedByUser = req.user;

        // Remove the deleted work order from the user's workOrders array
        await User.findByIdAndUpdate(deletedByUser._id, { $pull: { workOrders: workOrderId }});

        // Send Email Notification
        const subject = `WORK ORDER DELETED`;
        const text = `The work order titled ${workOrder.title} has been deleted by ${deletedByUser.username}`;

        await sendEmailNotification(workOrder, subject, text);

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
    queryAllWork,
    getSingleWorkOrder,
    deleteWorkOrder,
}