const Task = require("../models/taskModel");

// addTask Controller
const addTask = async (req, res) => {
    const task = req.body;

    const newTask = new Task(task);

    try {
        await newTask.save();
        res.status(200).json(newTask);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
};



module.exports = {
    addTask,
}