const express = require("express");
const router = express.Router();
const { newEmployee, getEmployees, getEmployee, deleteEmployee, updateEmployee, queryEmployees, countEmployees } = require("../controllers/employee.controller");
const { protect, restrict, cacheMiddleware } = require("../middleware/authMiddleware");

router.post("/register", protect, restrict(["admin", "superadmin", "engineer", "maintenance"]), newEmployee);
router.get("/all", protect, restrict(["admin", "superadmin", "engineer", "reviewer", "maintenance"]), cacheMiddleware, getEmployees);
router.get("/query", protect, restrict(["admin", "superadmin", "hod", "reviewer", "engineer", "supervisor", "maintenance"]), cacheMiddleware, queryEmployees);
router.get("/employee/:id", protect, restrict(["admin", "superadmin", "engineer", "maintenance"]), cacheMiddleware, getEmployee);
router.get("/count", protect, cacheMiddleware, countEmployees);
router.put("/update/:id", protect, restrict(["admin", "superadmin", "engineer", "maintenance"]), updateEmployee);
router.delete("/employee/:id", protect, restrict(["admin", "superadmin"]), deleteEmployee);

module.exports = router;