const asyncHandler = require("express-async-handler");
const cron = require("node-cron");

const WorkOrder = require("../model/work.order.model");
const User = require("../model/user.model");
const Category = require("../model/category.model");
const Employee = require("../model/employee.model");
const sendEmail = require("../utils/email");
const Location = require("../model/location.model");
const logger = require("../utils/logger");
const { SendAssignedWorkEmail } = require("../EmailService/assignedWork");
const { SendNewWorkEmail } = require("../EmailService/newWork");

// Sending email function
const sendEmailNotification = async (WorkOrder, subject, text) => {
    const requestedUser = await User.findById(WorkOrder.requestedBy).select("email");

    if (!requestedUser) {
        return logger.error("Requested User not found");
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
            "fidel.tuwei@holidayinnnairobi.com"
        ];
    } else {
        ccList = [
            "workorder@holidayinnnairobi.com", 
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
const createWorkOrder = asyncHandler (async (req, res) => {
    try {
        const { description, location, priority, serviceType, category, } = req.body;

        // Iclude the username of the user who requests for work
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");
    
        if (!user) {
            return res.status(404).json({ error: `User with ID: ${userId} not found` });
        };
        
        // Create Work Order
        const newWorkOrder = await WorkOrder({
            requestedBy: userId,
            priority,
            description,
            location,
            serviceType,
            category,
        });

        if (newWorkOrder) {
            // Save Work Order
            const savedWorkorder = await newWorkOrder.save();

            res.status(201).json(savedWorkorder);

            // Update the user's workOrders array
            await User.findByIdAndUpdate(userId, { $push: { workOrders: savedWorkorder._id }});

            await SendNewWorkEmail({
                workOrderNumber: savedWorkorder.workOrderNumber,
                description: savedWorkorder.description,
                priority: savedWorkorder.priority,
                status: savedWorkorder.status,
                serviceType: savedWorkorder.serviceType,
                username: savedWorkorder.requestedBy,
            });
        } else {
            return res.status(400).json({ error: "Invalid work order fields entered" });
        }
     
    } catch (error) {
        logger.error("Error in cretaeWorkOrder controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    } 
});

// Update Work Order
const updateWorkOrder = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");
    
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
    
        const { assignedTo, ...updatedFields } = { ...req.body };
        const updatedWorkOrder = await updateWorkOrderDetails(id, updatedFields);
    
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
    
        res.status(200).json(updatedWorkOrder);

    } catch (error) {
        logger.error("Error in updateWorkOrder controller", error);
        res.status(500).json({ error: "Internal Server Error" });
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

    return await WorkOrder.findByIdAndUpdate(id, updatedFields, updateOptions);
};

// Handle Assigned Work Orders
async function handleAssignedWorkOrder (updatedWorkOrder, assignedTo) {
    // update the assignedTo field
    updatedWorkOrder.assignedTo = assignedTo;
    updatedWorkOrder.dateAssigned = new Date();

    await updatedWorkOrder.save();

    // Send an email notification to the assigned employee
    await SendAssignedWorkEmail(updatedWorkOrder, assignedTo);

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
        - Work Order Number: ${updatedWorkOrder.workOrderNumber}
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
const getWorkOrders = asyncHandler(async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const searchTerm = req.query.searchTerm || "";
        let query = {};
    
        // query work status
        if (req.query.status) {
            query.status = req.query.status;
        }
    
        // query work tracker status
        if (req.query.tracker) {
            query.tracker = req.query.tracker;
        }

        // query work serviceType
        if (req.query.serviceType) {
            query.serviceType = req.query.serviceType;
        };

        // query work priority
        if (req.query.priority) {
            query.priority = req.query.priority;
        }

        // query work location
        if (req.query.location) {
            query.location = req.query.location;
        };
        
        // query work category
        if (req.query.category) {
            query.category = req.query.category;
        };

        // query work by employee assigned
        if (req.query.assignedTo) {
            query.assignedTo = req.query.assignedTo;
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
            return res.status(404).json({ error: "Work Orders not found!" });
        }
    
        res.status(200).json({
            workOrders,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });

    } catch (error) {
        logger.error("Error in getWorkOrders controller", error);
        res.status(500).json({ error: "Internal ServerError" });
    }
});

// Query All work orders for line graph frontend
const displayWork = asyncHandler (async (req, res) => {
    try {
        const workOrders = await WorkOrder.find({}).populate("location", "locationTitle")
            .populate("requestedBy", "firstName")
            .populate("category", "categoryTitle")
            .populate("assignedTo", "firstName lastName")
            .sort({ Date_Created: -1 });
    
        if (!workOrders) {
            return res.status(404).json({ error: "Work Orders not found" });
        };
    
        return res.status(200).json(workOrders);

    } catch (error) {
        logger.error("Error in queryWork controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Find work order with In_Attendance tracker status
const inAttendanceTracker = asyncHandler (async(req, res) => {
    try {
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
            return res.status(404).json({ error: "No Work Orders In-attendance found!" });
        }
    
        return res.status(200).json({
            workInAttendance,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        logger.error("Error in inAttendanceTracker controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Find work order with  In_Complete tracker status
const inCompleteTracker = asyncHandler (async(req, res) => {
    try {
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
            return res.status(404).json({ error: "In-complete work data not found!" });
        };
    
        res.status(200).json({
            workInComplete,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });

    } catch (error) {
        logger.error("Error in incompleteTracker controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Find work order with Attended tracker status
const attendedTracker = asyncHandler (async (req, res) => {
    try {
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
            return res.status(404).json({ error: "No work attended data found!" });
        };
    
        res.status(200).json({
            workAttended,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });

    } catch (error) {
        logger.error("Error in attendedTracker", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get single Work Order
const getWorkOrder = asyncHandler (async (req, res) => {
    try {
        const workOrderId = req.params.id;
        const work = await WorkOrder.findById(workOrderId)
            .populate("requestedBy", "username")
            .populate("location", "locationTitle")
            .populate("category", "categoryTitle")
            .populate("assignedTo", "firstName lastName phone")
            .exec();
    
        if (!work) {
            return res.status(404).json({ error: "Work order not found!" });
        }
    
        res.status(200).json(work);

    } catch (error) {
        logger.error("Error in getWorkOrder controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete Work Order
const deleteWorkOrder = asyncHandler (async (req, res) => {
    try {
        const workOrderId = req.params.id;
        const workOrder = await WorkOrder.findByIdAndDelete(workOrderId).populate("requestedBy", "username");
    
        if (!workOrder) {
            return res.status(404).json({ error: "Work order with ID not found!" });
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
    
        return res.status(200).json({ message: "Work Order deleted" });
    } catch (error) {
        logger.error("Error in deleteWorkOrder controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// send email reminder for work order schedule
async function sendWorkOrderReminderEmail(workOrders) {
    const emailSubject = `Work Order Reminder`;
    let emailText = `The following work orders need your immediate attention. Kindly login and update the details:\n`;

    workOrders.forEach((workOrder) => {
        emailText += `\n- Work Order Number: ${workOrder.workOrderNumber}\n`;
        emailText += `- Work Order Description: ${workOrder.description}\n`;
        emailText += `- Work Order Status: ${workOrder.status}\n`;
        emailText += `- Work Order Priority: ${workOrder.priority}\n`;
    });

    const engineerEmail = "workorder@holidayinnnairobi.com";
    const ccEmails = [
        "fidel.tuwei@holidayinnnairobi.com"
    ];

    sendEmail({
        email: engineerEmail,
        cc: ccEmails,
        subject: emailSubject,
        text: emailText
    });
}

// fundtion to filter work by status for cron job
async function workOrderReminderCron() {
    try {
        const workOrders = await WorkOrder.find({
            status: { $in: ["Pending"] },
            tracker: { $in: ["Not_Attended", "In_Attendance"] },
        }).sort({ Date_Created: -1 });

        if (workOrders.length > 0) {
            await sendWorkOrderReminderEmail(workOrders);
        }
    } catch (error) {
        logger.error("Error in workOrderReminderCron scheduler", error);
    }
}

// Schedule the cron job to run everyday at 11 am (Server-time, Oregon-US)
cron.schedule("00 08 * * *", workOrderReminderCron);


module.exports = {
    createWorkOrder,
    updateWorkOrder,
    getWorkOrders,
    displayWork,
    inAttendanceTracker,
    inCompleteTracker,
    attendedTracker,
    getWorkOrder,
    deleteWorkOrder,
};