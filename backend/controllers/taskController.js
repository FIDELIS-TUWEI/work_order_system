const Task = require("../model/task");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const { USER, PASS } = require("../utils/env");

// create Task logic
const createTask = asyncHandler (async (req, res, next) => {

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
        async function sendMail(task) {
            try {
                const mailOptions = {
                    from: "fideliofidel9@gmail.com",
                    to: "fidel.tuwei@holidayinnnairobi.com",
                    subject: "New Work Order created",
                    html: `<p>A new task was created:</p><p>${task}</p>`,
                };
                const info = await transporter.sendMail(mailOptions);
                console.log("Email sent: " + info.response);
            } catch (error) {
                console.log("Error sending email:", error)
            }
        }

        // Function to create new task
        const task = await Task.create({
            title: req.body.title,
            location: req.body.location,
            priority: req.body.priority,
            category: req.body.category,
            taskType: req.body.taskType,
            assignedTo: req.body.assignedTo,
            assignedBy: req.body.assignedBy,
            date: req.body.date
        });
        res.status(201).json({
            success: true,
            data: {
                task
            }
        });
        sendMail(task);
    } catch (error) {
        next(error);
    }
});

// get Task logic
const singleTask = asyncHandler (async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: `No task with ID: ${id} found` });
        }

        res.status(200).json({
            success: true,
            data: {
                task
            }
        })
    } catch (error) {
        next(error);
    }
});

// update Task logic
const updateTask = asyncHandler (async (req, res, next) => {
    try {
       const task = await Task.findByIdAndUpdate(req.params.task_id, req.body, {new: true, runValidators: true});
       res.status(200).json({
        success: true,
        data: {
            task
        },
        message: `Task updated succesfully `
       }) 
    } catch (error) {
        next(error);
    }
});

// get Tasks Logic
const getTasks = asyncHandler (async (req, res, next) => {
    try {
       const tasks = await Task.find();
       res.status(200).json({
        success: true,
        data: {
            tasks
        }
       }) 
    } catch (error) {
        next(error);
    }
});

// delete task logic
const deleteTask = asyncHandler (async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json(`No task with id: ${id} exists`)
        }

        res.status(200).json({
            success: true,
            message: "Task deleted"
        })
    } catch (error) {
        next(error);
    }
});

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    singleTask,
}