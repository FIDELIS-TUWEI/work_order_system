const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories } = require("../controllers/categoryController");
const { protect, restrict } = require("../middleware/authMiddleware");

router.post("/new/category", protect, restrict(["admin", "superadmin"]), createCategory);
router.get("/all/categories", protect, restrict(["admin", "superadmin", "hod", "reviewer", "supervisor", "user"]), getAllCategories);

module.exports = router;