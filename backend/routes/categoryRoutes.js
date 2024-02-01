const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories, updateCategory, deleteCategory, queryAllCategories } = require("../controllers/categoryController");
const { restrict, cacheMiddleware } = require("../middleware/authMiddleware");

router.post("/new/category", restrict(["admin", "superadmin", "supervisor"]), createCategory);
router.get("/all/categories", cacheMiddleware, getAllCategories);
router.get("/query/all/categories", restrict(["admin", "superadmin", "hod", "reviewer", "engineer", "user", "supervisor"]), cacheMiddleware, queryAllCategories);
router.put("/edit/category/:id", restrict(["admin", "superadmin", "supervisor"]), updateCategory);
router.delete("/delete/category/:id", restrict(["admin", "superadmin", "supervisor"]), deleteCategory);

module.exports = router;