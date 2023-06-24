const Task = require("../model/task");
const asyncHandler = require("express-async-handler");

// create Task logic
const newTask = asyncHandler (async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json({
            success: true,
            data: {
                task
            }
        });
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
})

// update Task logic
const updateTask = asyncHandler (async (req, res, next) => {
    try {
       const {id} = req.params
       const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {new: true, runValidators: true});
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

// get Task logic
const getTask = asyncHandler (async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
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

module.exports = {
    newTask,
    getTasks,
    updateTask,
    deleteTask,
    getTask,
}