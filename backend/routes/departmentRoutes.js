const express = require("express");
const router = express.Router();
const { protect, restrict, cacheMiddleware } = require("../middleware/authMiddleware");
const { createDepartment, getAllDepartments, deleteDepartment, queryAllDepartments } = require("../controllers/departmentController");


router.post("/new/department", protect, restrict(["admin", "superadmin"]), createDepartment);
router.get("/all-departments", protect, restrict(["admin", "superadmin"]), cacheMiddleware, getAllDepartments);
router.get("/query/all/departments", protect, restrict(["admin", "superadmin"]), cacheMiddleware, queryAllDepartments);
router.delete("/delete/department/:id", protect, restrict(["admin", "superadmin"]), deleteDepartment);

module.exports = router;