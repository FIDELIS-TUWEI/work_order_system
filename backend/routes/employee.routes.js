const express = require("express");
const router = express.Router();
const { newEmployee, getAllEmployees, getEmployee, deleteEmployee, updateEmployee, queryAllEmployees, countEmployees } = require("../controllers/employee.controller");
const { protect, restrict, cacheMiddleware } = require("../middleware/authMiddleware");

router.post("/register", protect, restrict(["admin", "superadmin", "engineer", "maintenance"]), newEmployee);
router.get("/employees", protect, restrict(["admin", "superadmin", "engineer", "reviewer", "maintenance"]), cacheMiddleware, getAllEmployees);
router.get("/query/employees", protect, restrict(["admin", "superadmin", "hod", "reviewer", "engineer", "supervisor", "maintenance"]), cacheMiddleware, queryAllEmployees);
router.get("/employee/:id", protect, restrict(["admin", "superadmin", "engineer", "maintenance"]), cacheMiddleware, getEmployee);
router.get("/count/employees", protect, cacheMiddleware, countEmployees);
router.put("/edit/employee/:id", protect, restrict(["admin", "superadmin", "engineer", "maintenance"]), updateEmployee);
router.delete("/employee/:id", protect, restrict(["admin", "superadmin"]), deleteEmployee);

module.exports = router;