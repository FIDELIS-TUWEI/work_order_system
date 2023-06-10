const asyncHandler = require("express-async-handler");
const Category = require("../model/category");

// create Category
const createCategory = asyncHandler (async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({
            sucess: true,
            category
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
});

// get All Categories
const getCategories = asyncHandler (async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(201).json({
            sucess: true,
            categories
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = {
    createCategory,
    getCategories,
}