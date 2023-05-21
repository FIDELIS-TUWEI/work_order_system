const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

// addTask Controller
const addTask = asyncHandler( async (req, res) => {
    const task = req.body;

    const newTask = new Task(task);

    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
});



module.exports = {
    addTask,
}