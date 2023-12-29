const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");
const { protect, restrict, cacheMiddleware } = require("../middleware/authMiddleware");

router.post("/new/category", protect, restrict(["admin", "superadmin", "supervisor"]), createCategory);
router.get("/all/categories", protect, cacheMiddleware, getAllCategories);
router.get("/query/all/categories", protect, restrict(["admin", "superadmin", "hod", "reviewer", "engineer", "user", "supervisor"]), cacheMiddleware, getAllCategories);
router.put("/edit/category/:id", protect, restrict(["admin", "superadmin", "supervisor"]), updateCategory);
router.delete("/delete/category/:id", protect, restrict(["admin", "superadmin", "supervisor"]), deleteCategory);

module.exports = router;