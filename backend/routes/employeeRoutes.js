const express = require("express");
const router = express.Router();
const { newEmployee, getAllEmployees, singleEmployee, deleteEmployee, editEmployee, countWorkAssigned, queryAllEmployees, countEmployees, getEmployeeInfo } = require("../controllers/employeeController");
const { protect, restrict } = require("../middleware/authMiddleware");

router.post("/new/employee", protect, restrict(["admin", "superadmin"]), newEmployee);
router.get("/all/employees", protect, restrict(["admin", "superadmin"]), getAllEmployees);
router.get("/query/all/employees", protect, restrict(["admin", "superadmin", "hod", "reviewer", "engineer", "supervisor"]), queryAllEmployees);
router.get("/single/employee/:id", protect, singleEmployee);
router.get("/employee/data", protect, getEmployeeInfo);
router.get("/employee/work/count", protect, restrict(["admin", "superadmin"]), countWorkAssigned);
router.get("/count/employees", protect, countEmployees);
router.put("/edit/employee/:id", protect, restrict(["admin", "superadmin"]), editEmployee);
router.delete("/delete/employee/:id", protect, restrict(["admin", "superadmin"]), deleteEmployee);

module.exports = router;