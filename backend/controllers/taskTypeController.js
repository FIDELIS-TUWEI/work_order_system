const TaskType = require("../model/taskType");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");

// Create Task Category
const createTasktype = asyncHandler (async (req, res, next) => {
    try {
        taskT = await TaskType.create({
            taskTypeName: req.body.taskTypeName,
            user: req.user.id
        });

        if (!taskT) {
            return next(new ErrorResponse("Task Category not created, try again!", 403));
        }
        res.status(201).json({
            success: true,
            taskT
        })
    } catch (error) {
        next(error)
    }
});

// All Tasks Category
const allTaskType = asyncHandler (async (req, res, next) => {
    try {
        const taskT = await TaskType.find();

        if (!taskT) {
            return next(new ErrorResponse("Tasks do not exist", 403));
        }

        res.status(200).json({
            sucess: true,
            taskT
        })
    } catch (error) {
        next(error);
    }
});

// Update Task Type
const updateTaskType = asyncHandler (async (req, res, next) => {
    try {
        const taskT = await TaskType.findByIdAndUpdate(req.params.type_id, req.body, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            data: taskT
        })
    } catch (error) {
        next(error);
    }
});

// Delete Task Type
const deleteTaskType = asyncHandler (async (req, res, next) => {
    try {
        const taskT = await TaskType.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            message: "Task Type Deleted"
        })
    } catch (error) {
        next(new ErrorResponse("Server Error", 500));
    }
})

module.exports = {
    createTasktype,
    allTaskType,
    updateTaskType,
    deleteTaskType
}