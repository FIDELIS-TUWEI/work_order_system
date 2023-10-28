const express = require("express");
const router = express.Router();
const { protect, restrict } = require("../middleware/authMiddleware");
const { createDepartment, getAllDepartments, deleteDepartment, queryAllDepartments } = require("../controllers/departmentController");


router.post("/new/department", protect, restrict(["admin", "superadmin", "supervisor"]), createDepartment);
router.get("/all-departments", protect, restrict(["admin", "superadmin", "supervisor"]), getAllDepartments);
router.get("/query/all/departments", protect, restrict(["admin", "superadmin", "supervisor"]), queryAllDepartments);
router.delete("/delete/department/:id", protect, restrict(["admin", "superadmin", "supervisor"]), deleteDepartment);

module.exports = router;