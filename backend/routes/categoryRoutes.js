const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");
const { protect, restrict } = require("../middleware/authMiddleware");
const {verifyJWT} = require("../middleware/verifyJWT");

router.post("/new/category", protect, restrict(["admin", "superadmin", "supervisor"]), createCategory);
router.get("/all/categories", verifyJWT, getAllCategories);
router.put("/edit/category/:id", protect, restrict(["admin", "superadmin", "supervisor"]), updateCategory);
router.delete("/delete/category/:id", protect, restrict(["admin", "superadmin", "supervisor"]), deleteCategory);

module.exports = router;