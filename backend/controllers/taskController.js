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
}

// Get a singleTask controller
const getTask = async (req, res) => {

}

module.exports = {
    createTask,
    getTasks,
    getTask,
}