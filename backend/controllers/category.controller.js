const Category = require("../model/category.model");
const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger");


// Create category
const createCategory = asyncHandler (async (req, res) => {
    try {
        // Check for duplicate category
        const duplicate = await Category.findOne({ categoryTitle: req.body.categoryTitle });
        if (duplicate) {
            return res.status(404).json({ error: "Category already exists!" });
        }
    
        // create new category
        const newCategory = new Category(req.body);
    
        // Save the created category
        await newCategory.save();

        res.status(201).json({
            success: true,
            data: newCategory
        });
    } catch (error) {
        logger.error("Error in createCategory controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all categories
const getAllCategories = asyncHandler (async (req, res) => {
    try {
        // Enable Pagination
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;
        const count = await Category.find({}).estimatedDocumentCount();

        // Find categories in the DB
        const categories = await Category.find({})
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        if (!categories) {
            return res.status(404).json({ error: "No categories found" });
        }
        
        res.status(200).json({
            success: true,
            data: categories,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });

    } catch (error) {
        logger.error("Error in getAllCategories", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Query all categories without pagination
const queryAllCategories = asyncHandler (async (req, res) => {
    try {
        // Find categories in DB
        const categories = await Category.find({});
    
        if (!categories) {
            return res.status(404).json({ error: "No categories found!" });
        }
    
        res.status(200).json({
            success: true,
            data: categories
        });

    } catch (error) {
        logger.error("Error in queryAllCategories controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Category info
const singleCategory = asyncHandler (async (req, res) => {
    try {
        const catId = req.params.id;
        const categoryInfo = await Category.findById(catId);
    
        if (!categoryInfo) {
            return res.status(404).json({ error: `No category with ID: ${catId} found` });
        };
    
        return res.status(200).json({
            success: true,
            data: categoryInfo
        });
    } catch (error) {
        logger.error("Error in singleCategory controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update category
const updateCategory = asyncHandler (async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!category) return res.status(404).json({ error: "Category not found" });
    
        res.status(200).json({
            success: true,
            message: "Category Updated successfully"
        });
    } catch (error) {
        logger.error("Error in updateCategory controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete Category
const deleteCategory = asyncHandler (async (req, res) => {
    try {
        const catId = req.params.id;
        const deletedCategory = await Category.findByIdAndDelete(catId);
    
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        };
    
        return res.status(200).json({
            success: true,
            message: "Category deleted"
        });
    } catch (error) {
        logger.error("Error in deleteCategory controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = {
    createCategory,
    getAllCategories,
    queryAllCategories,
    updateCategory,
    singleCategory,
    deleteCategory
};