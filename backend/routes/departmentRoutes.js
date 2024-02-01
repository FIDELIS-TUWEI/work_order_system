const express = require("express");
const router = express.Router();
const { restrict, cacheMiddleware } = require("../middleware/authMiddleware");
const { createDepartment, getAllDepartments, deleteDepartment, queryAllDepartments } = require("../controllers/departmentController");


router.post("/new/department", restrict(["admin", "superadmin", "supervisor"]), createDepartment);
router.get("/all-departments", restrict(["admin", "superadmin", "supervisor"]), cacheMiddleware, getAllDepartments);
router.get("/query/all/departments", restrict(["admin", "superadmin", "supervisor"]), cacheMiddleware, queryAllDepartments);
router.delete("/delete/department/:id", restrict(["admin", "superadmin", "supervisor"]), deleteDepartment);

module.exports = router;