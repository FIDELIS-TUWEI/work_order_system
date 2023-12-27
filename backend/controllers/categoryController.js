const Category = require("../model/category");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");


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
        if (!newCategory) {
            return res.status(400).json({
                success: false,
                message: "Category not created",
            });
        }

        // Save the created category
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
    // Enable Pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Category.find({}).estimatedDocumentCount();
    try {
        const categories = await Category.find({})
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        if (!categories) {
            return res.status(400).json({ message: "No categories found" });
        }
        
        res.status(200).json({
            success: true,
            data: categories,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update category
const updateCategory = asyncHandler(async (req, res, next) => {
    try {
        const catId = req.params.id;
        const updates = req.body;
        const updatedCategory = await Category.findById(catId, updates, { new: true, runValidators: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        };

        res.status(200).json({
            success: true,
            data: updatedCategory
        })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const catId = req.params.id;
        const deletedCategory = await Category.findByIdAndDelete(catId);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        };

        return res.status(200).json({
            success: true,
            message: "Category deleted"
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
})

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};