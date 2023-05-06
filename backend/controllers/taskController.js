const Task = require("../models/taskModel");

// createTask Controller
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
};

// GetTasks Controller
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

// Get a singleTask controller
const getTask = async (req, res) => {
    try {
        const {id} = req.params
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json(`No task with id: ${id} found`);
        };

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

// Delete Task controller
const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json(`No task with id: ${id} found`);
        }

        res.status(200).send("Task deleted");
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

// update task controller
const updateTask = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
}