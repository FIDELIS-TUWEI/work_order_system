const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");
const { protect, restrict } = require("../middleware/authMiddleware");

router.post("/new/category", protect, restrict(["admin", "superadmin"]), createCategory);
router.get("/all/categories", protect, getAllCategories);
router.put("/edit/category/:id", protect, restrict(["admin", "superadmin"]), updateCategory);
router.delete("/delete/category/:id", protect, restrict(["admin", "superadmin"]), deleteCategory);

module.exports = router;