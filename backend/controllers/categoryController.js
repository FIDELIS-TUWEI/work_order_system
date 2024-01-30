const Category = require("../model/category");
const asyncHandler = require("express-async-handler");


// Create category
const createCategory = asyncHandler(async (req, res) => {
    try {
        const duplicate = await Category.findOne({ categoryTitle: req.body.categoryTitle });
        if (duplicate) {
            res.status(400);
            throw new Error("Category already exists");
        }

        // create new category
        const newCategory = new Category(req.body);
        if (!newCategory) {
            res.status(400);
            throw new Error("Category not created")
        }

        // Save the created category
        await newCategory.save();
        res.status(201).json({
            success: true,
            data: newCategory
        })
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Get all categories
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
            res.status(400);
            throw new Error("No categories found");
        }
        
        res.status(200).json({
            success: true,
            data: categories,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Query all categories without pagination
const queryAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({});

        if (!categories) {
            res.status(400);
            throw new Error("No categories found");
        }

        res.status(200).json({
            success: true,
            data: categories
        })
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// Update category
const updateCategory = asyncHandler(async (req, res, next) => {
    try {
        const catId = req.params.id;
        const updates = req.body;
        const updatedCategory = await Category.findById(catId, updates, { new: true, runValidators: true });

        if (!updatedCategory) {
            res.status(404);
            throw new Error("Category not found")
        };

        res.status(200).json({
            success: true,
            data: updatedCategory
        })
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const catId = req.params.id;
        const deletedCategory = await Category.findByIdAndDelete(catId);

        if (!deletedCategory) {
            res.status(404);
            throw new Error("Category not found");
        };

        return res.status(200).json({
            success: true,
            message: "Category deleted"
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

module.exports = {
    createCategory,
    getAllCategories,
    queryAllCategories,
    updateCategory,
    deleteCategory
};