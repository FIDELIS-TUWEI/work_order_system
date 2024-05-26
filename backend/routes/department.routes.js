const express = require("express");
const router = express.Router();
const { protect, restrict, cacheMiddleware } = require("../middleware/authMiddleware");
const { createDepartment, getDepartments, deleteDepartment, queryDepartments } = require("../controllers/department.controller");


router.post("/new", protect, restrict(["admin", "superadmin"]), createDepartment);
router.get("/", protect, restrict(["admin", "superadmin"]), cacheMiddleware, getDepartments);
router.get("/query", protect, restrict(["admin", "superadmin"]), cacheMiddleware, queryDepartments);
router.delete("/:id", protect, restrict(["admin", "superadmin"]), deleteDepartment);

module.exports = router;