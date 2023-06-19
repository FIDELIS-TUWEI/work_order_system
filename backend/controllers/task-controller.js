const asyncHandler = require("express-async-handler");
const Task = require("../model/task");

// create task
const createTask = asyncHandler (async (req, res, next) => {
    const { workIdentified, location, description, category, employeeAssigned, manager, workStatus, date } = req.body;

    try {
        const task = await Task.create({
            workIdentified,
            location,
            description,
            category,
            employeeAssigned,
            manager,
            workStatus,
            date
        });
        res.status(201).json({
            success: true,
            task
        });

    } catch (error) {
        console.log(error);
        next(error);
    }

});

// Display Task
const displayTask = asyncHandler (async (req, res, next) => {
    // Enable pagination
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Task.find({}).estimatedDocumentCount();

    // All category Ids
    let ids = [];
    const categ = await Category.find({}, { _id: 1 });
    categ.forEach(cat => {
        ids.push(cat._id);
    });

    // filter
    let cat = req.query.cat;
    let query = cat !== "" ? cat : ids;

    try {
        const tasks = await Task.find({ category: query }).populate("category", "name")
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        res.status(201).json({
            success: true,
            tasks,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Update task data in MongoDB
const updateTask = asyncHandler (async (req, res, next) => {
    try {
        // Build data object
        const data = {
            workIdentified: req.body.workIdentified,
            location: req.body.location,
            description: req.body.description,
            category: req.body.category,
            employeeAssigned: req.body.employeeAssigned,
            manager: req.body.manager,
            workStatus: req.body.workStatus,
            date: req.body.date
        }

        const taskUpdate = await Task.findOneAndUpdate(req.params.id, data, { new: true });

        res.status(201).json({
            success: true,
            taskUpdate
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Delete Task
const deleteTask = asyncHandler (async (req, res, next) => {
    try {
        const removeTask = await Task.findByIdAndDelete(req.params.id);

        res.status(201).json({
            success: true,
            removeTask,
            message: "Task Deleted Succesfully"
        })
    } catch (error) {
        
    }
});

// Task Category
const taskCategory = asyncHandler (async (req, res, next) => {
    try {
        const cat = await Task.find().populate("category", "name").distinct("category");
        res.status(201).json({
            success: true,
            cat
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
})



module.exports = {
    createTask,
    displayTask,
    updateTask,
    deleteTask,
    taskCategory,
}