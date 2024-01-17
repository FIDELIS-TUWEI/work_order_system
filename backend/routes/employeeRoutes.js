const express = require("express");
const router = express.Router();
const { newEmployee, getAllEmployees, singleEmployee, deleteEmployee, editEmployee, countWorkAssigned, queryAllEmployees, countEmployees, getEmployeeInfo } = require("../controllers/employeeController");
const { protect, restrict, cacheMiddleware } = require("../middleware/authMiddleware");

router.post("/new/employee", protect, restrict(["admin", "superadmin", "engineer"]), newEmployee);
router.get("/all/employees", protect, restrict(["admin", "superadmin", "engineer", "reviewer", "supervisor"]), cacheMiddleware, getAllEmployees);
router.get("/query/all/employees", protect, restrict(["admin", "superadmin", "hod", "reviewer", "engineer", "supervisor"]), cacheMiddleware, queryAllEmployees);
router.get("/single/employee/:id", protect, cacheMiddleware, singleEmployee);
router.get("/employee/data/:id", protect, cacheMiddleware, getEmployeeInfo);
router.get("/employee/work/count", protect, cacheMiddleware, restrict(["admin", "superadmin", "engineer", "supervisor"]), countWorkAssigned);
router.get("/count/employees", protect, cacheMiddleware, countEmployees);
router.put("/edit/employee/:id", protect, restrict(["admin", "superadmin", "engineer", "supervisor"]), editEmployee);
router.delete("/delete/employee/:id", protect, restrict(["admin", "superadmin"]), deleteEmployee);

module.exports = router;