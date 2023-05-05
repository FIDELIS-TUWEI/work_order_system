const Task = require("../models/taskModel");

const CreateTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
};


module.exports = {
    CreateTask,
}