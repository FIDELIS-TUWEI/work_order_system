const Category = require("../model/category");
const asyncHandler = require("express-async-handler");


// Create category
const createCategory = asyncHandler(async (req, res) => {
    try {
        const duplicate = await Category.findOne({ categoryTitle: req.body.categoryTitle });
        if (duplicate) {
            return res.status(400).json({
                success: false,
                message: "Category already exists",
            });
        }

        // create new category
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json({
            success: true,
            data: newCategory
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({}).populate("category", "categoryTitle");

        if (!categories) {
            return res.status(400).json({ message: "No categories found" });
        }
        
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

module.exports = {
    createCategory,
    getAllCategories
}