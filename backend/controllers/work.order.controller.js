const asyncHandler = require("express-async-handler");
const cron = require("node-cron");

const WorkOrder = require("../model/work.order.model");
const User = require("../model/user.model");
const Category = require("../model/category.model");
const Employee = require("../model/employee.model");
const sendEmail = require("../utils/email");
const Location = require("../model/location.model");
const logger = require("../utils/logger");
const config = require("../utils/config");
const { SendAssignedWorkEmail } = require("../EmailService/assignedWork");
const { SendNewWorkEmail } = require("../EmailService/newWork");
const { SendCompleteWorkEmail } = require("../EmailService/completeWork");
const { SendIncompleteWorkEmail } = require("../EmailService/incompleteWork");

// Create Work Order
const createWorkOrder = asyncHandler (async (req, res) => {
    try {
        const { description, location, priority, serviceType, category, } = req.body;

        // Include the username of the user who requests for work
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

            // Fetch Location Details
            const locations = await Location.find({ _id: { $in: location } }).select("locationTitle");
            const locationTitles = locations.map(loc => loc.locationTitle).join(', ');
        
            // Fetch category details
            const categories = await Category.find({ _id: { $in: category } }).select("categoryTitle");
            const categoryTitle = categories.map(cat => cat.categoryTitle);

            // Determine email receipients based on work order category
            const requestedUser = await User.findById(userId).select("email");
            const workOrderCategory = await Category.findById(newWorkOrder.category).select("categoryTitle");
            let ccList;

            const itCategoryList = [
                "IT", "Room Wi-Fi", "Room-Tv", "Telephone", "Cable Pulling", "Office Printer", 
                "Guest Wi-Fi", "Conference I.T Support", "Office Wi-Fi", "Restaurant Tv", "Onity-lock"
            ].includes(workOrderCategory.categoryTitle);

            if (itCategoryList) {
                ccList = ["fidel.tuwei@holidayinnnairobi.com", "peter.wangodi@holidayinnnairobi.com", "joel.njau@holidayinnnairobi.com"]
            } else {
                ccList = ["workorder@holidayinnnairobi.com", "ms@holidayinnnairobi.com"]
            };

            //Prepare email options including CC list
            const emailOptions = {
                from: config.EMAIL,
                to: requestedUser.email, // include the requester's email
                cc: ccList.join(","),
            };

            await SendNewWorkEmail({
                workOrderNumber: savedWorkorder.workOrderNumber,
                description: savedWorkorder.description,
                location: locationTitles,
                priority: savedWorkorder.priority,
                category: categoryTitle,
                status: savedWorkorder.status,
                serviceType: savedWorkorder.serviceType,
                requestedBy: user.username,
                emailOptions
            });

            // Update the user's workOrders array
            await User.findByIdAndUpdate(userId, { $push: { workOrders: savedWorkorder._id }});
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
        const user = await User.findById(userId).select("-password", "email", "username");
    
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
    
        const { assignedTo, ...updatedFields } = { ...req.body };
        const updatedWorkOrder = await updateWorkOrderDetails(id, updatedFields);
    
        if (updatedFields.tracker === "In_Complete") {
            // fetch the work order category to determine recipients
            const workOrderCategory = await Category.findById(updatedWorkOrder.category).select("categoryTitle");
            const categoryTitle = workOrderCategory.map(cat => cat.categoryTitle);

            // Fetch Location Details
            const locations = await Location.find({ _id: { $in: location } }).select("locationTitle");
            const locationTitles = locations.map(loc => loc.locationTitle).join(', ');

            let ccList;

            // Determine recipients based on the work order category
            const itCategoryList = [
                "IT", "Room Wi-Fi", "Room-Tv", "Telephone", "Cable Pulling", "Office Printer", 
                "Guest Wi-Fi", "Conference I.T Support", "Office Wi-Fi", "Restaurant Tv", "Onity-lock"
            ].includes(workOrderCategory.categoryTitle);

            if (itCategoryList) {
                ccList = ["fidel.tuwei@holidayinnnairobi.com", "peter.wangodi@holidayinnnairobi.com", "joel.njau@holidayinnnairobi.com"];
            } else {
                ccList = ["workorder@holidayinnnairobi.com", "ms@holidayinnnairobi.com"];
            };

            // Prepare email options including CC list
            const emailOptions = {
                from: config.EMAIL,
                to: user.email, // include the requester's email 
                cc: ccList.join(", "),
            };

            await SendIncompleteWorkEmail({
                workOrderNumber: updatedWorkOrder.workOrderNumber,
                description: updatedWorkOrder.description,
                location: locationTitles,
                priority: updatedWorkOrder.priority,
                category: categoryTitle,
                status: updatedWorkOrder.status,
                serviceType: updatedWorkOrder.serviceType,
                tracker: updatedWorkOrder.tracker,
                trackerMessage: updatedWorkOrder.trackerMessage,
                updatedBy: user.username,
                dateUpdated: updatedWorkOrder.Date_Updated,
                emailOptions
            });

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
        }
    
        // check if the work status is complete and send email notification
        if (updatedFields.status === "Complete") {
            // fetch the work order category to determine recipients
            const workOrderCategory = await Category.findById(updatedWorkOrder.category).select("categoryTitle");
            const categoryTitle = workOrderCategory.map(cat => cat.categoryTitle);

            // Fetch Location Details
            const locations = await Location.find({ _id: { $in: location } }).select("locationTitle");
            const locationTitles = locations.map(loc => loc.locationTitle).join(', ');

            let ccList;

            // Determine recipients based on the work order category
            const itCategoryList = [
                "IT", "Room Wi-Fi", "Room-Tv", "Telephone", "Cable Pulling", "Office Printer", 
                "Guest Wi-Fi", "Conference I.T Support", "Office Wi-Fi", "Restaurant Tv", "Onity-lock"
            ].includes(workOrderCategory.categoryTitle);

            if (itCategoryList) {
                ccList = ["fidel.tuwei@holidayinnnairobi.com", "peter.wangodi@holidayinnnairobi.com", "joel.njau@holidayinnnairobi.com"];
            } else {
                ccList = ["workorder@holidayinnnairobi.com", "ms@holidayinnnairobi.com"];
            };

            // Prepare email options including CC list
            const emailOptions = {
                from: config.EMAIL,
                to: user.email, // include the requester's email 
                cc: ccList.join(", "),
            };

            await SendCompleteWorkEmail({
                workOrderNumber: updatedWorkOrder.workOrderNumber,
                description: updatedWorkOrder.description,
                location: locationTitles,
                priority: updatedWorkOrder.priority,
                category: categoryTitle,
                status: updatedWorkOrder.status,
                serviceType: updatedWorkOrder.serviceType,
                tracker: updatedWorkOrder.tracker,
                trackerMessage: updatedWorkOrder.trackerMessage,
                dateCompleted: updatedWorkOrder.dateCompleted,
                comments: updatedWorkOrder.comments,
                checkedBy: updatedWorkOrder.checkedBy,
                dateUpdated: updatedWorkOrder.Date_Updated,
                emailOptions
            });
    
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
    const employee = await Employee.findById(assignedTo);

    // update the assignedTo field
    updatedWorkOrder.assignedTo = assignedTo;
    updatedWorkOrder.dateAssigned = new Date();

    await updatedWorkOrder.save();

     // Fetch Location Details
     const locations = await Location.find({ _id: { $in: location } }).select("locationTitle");
     const locationTitles = locations.map(loc => loc.locationTitle).join(', ');
 
     // Fetch category details
     const categories = await Category.find({ _id: { $in: updatedWorkOrder.category } }).select("categoryTitle");
     const categoryTitle = categories.map(cat => cat.categoryTitle);

    const emailOptions = {
        from: config.EMAIL,
        to: "workshop@holidayinnnairobi.com",
        cc: "workorder@holidayinnnairobi.com"
    }

    // Send an email notification to the assigned employee
    await SendAssignedWorkEmail({
        workOrderNumber: updatedWorkOrder.workOrderNumber,
        description: updatedWorkOrder.description,
        priority: updatedWorkOrder.priority,
        status: updatedWorkOrder.status,
        location: locationTitles,
        category: categoryTitle,
        serviceType: updatedWorkOrder.serviceType,
        assignedTo: employee.firstName,
        dateAssigned: updatedWorkOrder.dateAssigned,
        emailOptions
    });

    // Find the employee and add the work order to their assignedwork array
    if (employee) {
        employee.assignedWork.push(updatedWorkOrder._id);
        await employee.save();
    }
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
};

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
};

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