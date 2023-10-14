const express = require("express");
const router = express.Router();
const { newEmployee, getAllEmployees, singleEmployee, deleteEmployee, editEmployee } = require("../controllers/employeeController");
const { protect, restrict } = require("../middleware/authMiddleware");

router.post("/new/employee", protect, restrict(["admin", "superadmin"]), newEmployee);
router.get("/all/employees", protect, restrict(["admin", "superadmin"]), getAllEmployees);
router.get("/single/employee/:id", protect, singleEmployee);
router.put("/edit/employee/:id", protect, restrict(["admin", "superadmin"]), editEmployee);
router.delete("/delete/employee/:id", protect, restrict(["admin", "superadmin"]), deleteEmployee);

module.exports = router;