const asyncHandler = require("express-async-handler");
const Task = require("../models/Task");

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
});

// Get a single Task with unique Id
const getTask = asyncHandler( async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Edit Task with Unique Id
const editTask = asyncHandler( async (req, res) => {
    let task = req.body;
    const editTaskDetails = new Task(task);

    try {
        await Task.updateOne({ _id: req.params.id }, editTaskDetails);
        res.status(201).json(editTaskDetails);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// Delete Task with unique Id
const deleteTask = asyncHandler( async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Task Deleted succesfully" });
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
});



module.exports = {
    addTask,
    getTasks,
    getTask,
    editTask,
    deleteTask,
}