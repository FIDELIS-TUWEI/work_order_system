const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controllers/category-controller');
const { isAuthenticated } = require("../middleware/authMiddleware");


router.post("/category/create", isAuthenticated, createCategory);
router.get("category/all", isAuthenticated, getCategories);

module.exports = router;