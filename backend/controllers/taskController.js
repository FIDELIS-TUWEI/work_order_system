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

// update Task logic
const updateTask = asyncHandler (async (req, res, next) => {
    try {
       const {id} = req.params
       const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {new: true});
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
})

module.exports = {
    newTask,
    updateTask,
}