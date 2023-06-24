const Task = require("../model/task");
const asyncHandler = require("express-async-handler");

// create Task logic
const newTask = asyncHandler (async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
});

module.exports = {
    newTask,
}