const express = require("express");
const router = express.Router();

const limiter = require("../middleware/limiter");

// Import Routes
const authRoutes = require("../routes/auth.routes");
const userRoutes = require("./user.routes");
const workOrderRoutes = require("./work.order.routes");
const locationRoutes = require("./location.routes");
const reportsRoutes = require("./report.routes");
const categoryRoutes = require("../routes/category.routes");
const departmentRoutes = require("../routes/department.routes");
const designationRoutes = require("../routes/designation.routes");
const employeeRoutes = require("../routes/employee.routes");


// Routes Middleware
router.use("/api/wos/v2/auth", limiter, authRoutes);
router.use("/api/wos/v2/users", limiter, userRoutes);
router.use("/api/wos/v2/work-orders", limiter, workOrderRoutes);
router.use("/api/wos/v2/locations", limiter, locationRoutes);
router.use("/api/wos/v2/reports", limiter, reportsRoutes);
router.use("/api/wos/v2/categories", limiter, categoryRoutes);
router.use("/api/wos/v2/departments", limiter, departmentRoutes);
router.use("/api/wos/v2/designations", limiter, designationRoutes);
router.use("/api/wos/v2/employees", limiter, employeeRoutes);

module.exports = router;