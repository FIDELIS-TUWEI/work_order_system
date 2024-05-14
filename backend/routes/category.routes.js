const express = require("express");
const router = express.Router();
const { createCategory, getCategories, updateCategory, deleteCategory, queryCategories, getCategory } = require("../controllers/category.controller");
const { protect, restrict, cacheMiddleware } = require("../middleware/authMiddleware");

router.post("/new/category", protect, restrict(["admin", "superadmin"]), createCategory);
router.get("/all", protect, cacheMiddleware, getCategories);
router.get("/query", protect, cacheMiddleware, queryCategories);
router.get("/category/:id", protect, restrict(["admin", "superadmin"]), cacheMiddleware, getCategory);
router.put("/update/:id", protect, restrict(["admin", "superadmin"]), updateCategory);
router.delete("/category/:id", protect, restrict(["admin", "superadmin"]), deleteCategory);

module.exports = router;