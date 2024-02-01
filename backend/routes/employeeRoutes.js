const express = require("express");
const router = express.Router();
const { newEmployee, getAllEmployees, singleEmployee, deleteEmployee, editEmployee, countWorkAssigned, queryAllEmployees, countEmployees, getEmployeeInfo } = require("../controllers/employeeController");
const { restrict, cacheMiddleware } = require("../middleware/authMiddleware");

router.post("/new/employee", restrict(["admin", "superadmin", "engineer"]), newEmployee);
router.get("/all/employees", restrict(["admin", "superadmin", "engineer", "reviewer", "supervisor"]), cacheMiddleware, getAllEmployees);
router.get("/query/all/employees", restrict(["admin", "superadmin", "hod", "reviewer", "engineer", "supervisor"]), cacheMiddleware, queryAllEmployees);
router.get("/single/employee/:id", cacheMiddleware, singleEmployee);
router.get("/employee/data/:id", cacheMiddleware, getEmployeeInfo);
router.get("/employee/work/count", cacheMiddleware, restrict(["admin", "superadmin", "engineer", "supervisor"]), countWorkAssigned);
router.get("/count/employees", cacheMiddleware, countEmployees);
router.put("/edit/employee/:id", restrict(["admin", "superadmin", "engineer", "supervisor"]), editEmployee);
router.delete("/delete/employee/:id", restrict(["admin", "superadmin"]), deleteEmployee);

module.exports = router;