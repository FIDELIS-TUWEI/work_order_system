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

// get All Tasks
const getTasks = asyncHandler( async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})



module.exports = {
    addTask,
    getTasks,
}