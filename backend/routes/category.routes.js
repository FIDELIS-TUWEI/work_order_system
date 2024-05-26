const express = require("express");
const router = express.Router();
const { createCategory, getCategories, updateCategory, deleteCategory, queryCategories, getCategory } = require("../controllers/category.controller");
const { protect, restrict, cacheMiddleware } = require("../middleware/authMiddleware");

router.post("/new", protect, restrict(["admin", "superadmin"]), createCategory);
router.get("/", protect, cacheMiddleware, getCategories);
router.get("/query", protect, cacheMiddleware, queryCategories);
router.get("/:id", protect, restrict(["admin", "superadmin"]), cacheMiddleware, getCategory);
router.put("/update/:id", protect, restrict(["admin", "superadmin"]), updateCategory);
router.delete("/:id", protect, restrict(["admin", "superadmin"]), deleteCategory);

module.exports = router;