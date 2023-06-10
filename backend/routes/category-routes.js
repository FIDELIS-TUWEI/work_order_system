const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controllers/category-controller');
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");


router.post("/category/create", isAuthenticated, isAdmin, createCategory);
router.get("category/all", isAuthenticated, isAdmin, getCategories);

module.exports = router;