const Task = require("../model/task");
const TaskType = require("../model/taskType");
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