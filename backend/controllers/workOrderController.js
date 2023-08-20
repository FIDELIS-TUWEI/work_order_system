const WorkOrder = require("../model/workOrder");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const nodemailer = require("nodemailer");
const { PASS, USER } = require("../utils/env");

// Create Work Order
const createWorkOrder = asyncHandler (async (req, res, next) => {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    }
    const { priority, title, location, serviceType, category } = req.body;

    try {
        // send email notification to cheif engineer
        // Configure gmail smtp
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: USER,
                pass: PASS,
            },
        });

        // Function to send Email
        async function sendMail(savedWorkorder) {
            try {
                const mailOptions = {
                    from: `workorder.holidayinnnairobi@gmail.com`,
                    to: `fidel.tuwei@holidayinnnairobi.com`,
                    subject: "New Work Order created",
                    html: `
                        <h2>A New Work Order was Created</h2>\n\n
                        <hr>\n
                            <h3>Work Order Details</h3>\n
                            <p>Work Title: ${savedWorkorder.title}</p>\n
                            <p>Work Location: ${savedWorkorder.location}</p>\n
                            <p>Priority: ${savedWorkorder.priority}</p>\n
                            <p>Category: ${savedWorkorder.category}</p>\n
                            <p>Service Type: ${savedWorkorder.serviceType}</p>\n
                            <p>Date: ${savedWorkorder.Date_Created}</p>\n
                    `,
                };
                const info = await transporter.sendMail(mailOptions);
                console.log("Email sent: " + info.response);
            } catch (error) {
                console.log("Error sending email:", error);
            }
            
        }

        //const user = await User.findById(req.params.id);
        const newWorkOrder = await WorkOrder({
            //requestedBy: userId,
            priority,
            title,
            location,
            serviceType,
            category,
        });

        const savedWorkorder = await newWorkOrder.save();
        sendMail(savedWorkorder);
        // push savedWorkOrder to the user's workOrders array
        await User.findByIdAndUpdate(userId, { $push: { workOrders: savedWorkorder._id } });
        
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

    try {
        const workOrderId = req.params.id;
        const updates = req.body;
        const updatedWorkorder = await WorkOrder.findByIdAndUpdate(workOrderId, updates, {new: true, runValidators: true}).populate();

        if (!updatedWorkorder) {
            return next(new ErrorResponse("Work Order not found", 404));
        }

        return res.status(200).json({
            success: true,
            data: updatedWorkorder
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Get all Work Orders
const getAllWorkOrders = asyncHandler (async (req, res, next) => {
    try {
        const workOrders = await WorkOrder.find({}).populate();
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
        const work = await WorkOrder.findById(workOrderId);
        if (!work) {
            return next(new ErrorResponse("Work Order not found", 404));
        }

        // Create PDF document
        const doc = new PDFDocument();

        // Set response headers
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `inline; filename=${work.title}_report.pdf`);
        //res.setHeader("Content-Disposition", "attachment; filename=workorder.pdf"); // to download

        doc.pipe(res);

        // Add content to the pdf
        doc.text(`Work Order: ${work.title}`, 20, 20, { underline: true });
        doc.text(`Work Location: ${work.location}`, 20, 30);
        doc.text(`Priority: ${work.priority}`, 20, 40);
        doc.text(`Category: ${work.category}`, 20, 50);
        doc.text(`Service Type: ${work.serviceType}`, 20, 60);
        doc.text(`Date Requested: ${work.Date_Created}`, 20, 70);
        doc.text(`Work Status: ${work.status}`, 20, 80);
        doc.text(`Assigned To: ${work.assignedTo}`, 20, 90);
        doc.text(`Date Completed: ${work.dateCompleted}`, 20, 100);
        doc.text(`Comments: ${work.comments}`, 20, 110);
        doc.text(`Reviewed: ${work.reviewed === true ? "Yes" : "No"}`, 20, 110);
        doc.text(`Reviewed By: ${work.reviewedBy}`, 20, 120);
        doc.text(`Reviewed Date: ${work.dateReviewed}`, 20, 130);
        doc.text(`Review Comments: ${work.reviewComments}`, 20, 140);

        // End the document
        doc.end();

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

        return res.status(200).json({
            success: true,
            message: "Work Order deleted"
        });
        
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Pending Work Order
const pendingWorkOrder = asyncHandler (async (req, res, next) => {
    try {
        const workOrder = await WorkOrder.find({status: "Pending"}).populate().select("-completedWork");
        if (!workOrder) {
            return next(new ErrorResponse("Work Order not found", 404));
        }
        return res.status(200).json({
            success: true,
            data: workOrder
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
        
});

const completedWorkOrder = asyncHandler (async (req, res, next) => {
    try {
        const workOrder = await WorkOrder.find({status: "Complete"}).populate().select("-completedWork");
        if (!workOrder) {
            return next(new ErrorResponse("Work Order not found", 404));
        }
        return res.status(200).json({
            success: true,
            data: workOrder
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
})

module.exports = {
    createWorkOrder,
    updateWorkOrder,
    getAllWorkOrders,
    getSingleWorkOrder,
    deleteWorkOrder,
    pendingWorkOrder,
    completedWorkOrder
}