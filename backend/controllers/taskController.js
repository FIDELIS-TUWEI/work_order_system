const Task = require("../model/task");
const TaskType = require("../model/taskType");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");

// create Task logic
const createTask = asyncHandler (async (req, res, next) => {
    try {
        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            priority: req.body.priority,
            taskType: req.body.taskType,
            status: req.body.status,
            assignedTo: req.body.assignedTo,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            data: {
                task
            }
        });
    } catch (error) {
        next(error);
    }
});

// get Task logic
const singleTask = asyncHandler (async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id).populate("taskType", "taskTypeName").populate("user", "name");
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
       const task = await Task.findByIdAndUpdate(req.params.task_id, req.body, {new: true, runValidators: true}).populate("taskType", "taskTypeName").populate("user", "name");
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

// Show taskType Logic
const showTaskType = asyncHandler (async (req, res, next) => {

    // Enable Search Query
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    // Enable Pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    //const count = await Task.find({}).estimatedDocumentCount();
    const count = await Task.find({ ...keyword }).countDocuments();

    try {
        const tasks = await Task.find({ ...keyword }).sort({ createdAt: -1 }).skip(pageSize *  (page - 1)).limit(pageSize);

        res.status(200).json({
            success: true,
            data: {
                tasks
            },
            page,
            pages: Math.ceil(count / pageSize),
            count,
        })
    } catch (error) {
        next(error);
    }
})

// get Tasks Logic
const getTasks = asyncHandler (async (req, res, next) => {
    try {
       const tasks = await Task.find().populate("taskType", "taskTypeName").populate("user", "name");
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
    showTaskType,
}