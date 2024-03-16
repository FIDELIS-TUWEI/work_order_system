const Category = require("../model/category");
const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");


// Create category
const createCategory = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // Check for duplicate category
    const duplicate = await Category.findOne({ categoryTitle: req.body.categoryTitle });
    if (duplicate) {
        const error = new CustomError("Category already exists!", 400);
        return next(error);
    }

    // create new category
    const newCategory = new Category(req.body);
    if (!newCategory) {
        const error = new CustomError("Failed to create new category!", 400)
        return next(error);
    }

    // Save the created category
    await newCategory.save();
    res.status(201).json({
        success: true,
        data: newCategory
    });
}));

// Get all categories
const getAllCategories = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // Enable Pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Category.find({}).estimatedDocumentCount();

    // Find categories in the DB
    const categories = await Category.find({})
        .skip(pageSize * (page - 1))
        .limit(pageSize)

    if (!categories) {
        const error = new CustomError("No categories found!", 404);
        return next(error);
    }
    
    res.status(200).json({
        success: true,
        data: categories,
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
}));

// Query all categories without pagination
const queryAllCategories = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    // Find categories in DB
    const categories = await Category.find({});

    if (!categories) {
        const error = new CustomError("No categories found!", 404);
        return next(error);
    }

    res.status(200).json({
        success: true,
        data: categories
    });
}));

// Category info
const singleCategory = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const catId = req.params.id;
    const categoryInfo = await Category.findById(catId);

    if (!categoryInfo) {
        const error = new CustomError("Category not found!", 404);
        return next(error);
    };

    return res.status(200).json({
        success: true,
        data: categoryInfo
    });
}))

// Update category
const updateCategory = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const catId = req.params.id;
    const updates = req.body;
    const updatedCategory = await Category.findById(catId, updates, { new: true, runValidators: true });

    if (!updatedCategory) {
        const error = new CustomError("Category not found!", 404);
        return next(error);
    };

    res.status(200).json({
        success: true,
        data: updatedCategory
    });
}));

// Delete Category
const deleteCategory = asyncHandler (asyncErrorHandler (async (req, res, next) => {
    const catId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(catId);

    if (!deletedCategory) {
        const error = new CustomError("Category not found!", 404);
        return next(error);
    };

    return res.status(200).json({
        success: true,
        message: "Category deleted"
    });
}))

module.exports = {
    createCategory,
    getAllCategories,
    queryAllCategories,
    updateCategory,
    singleCategory,
    deleteCategory
};