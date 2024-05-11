module.exports = (app) => {
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
    app.use("/api/wos/v2/auth", limiter, authRoutes);
    app.use("/api/wos/v2/users", limiter, userRoutes);
    app.use("/api/wos/v2/work-orders", limiter, workOrderRoutes);
    app.use("/api/wos/v2/locations", limiter, locationRoutes);
    app.use("/api/wos/v2/reports", limiter, reportsRoutes);
    app.use("/api/wos/v2/categories", limiter, categoryRoutes);
    app.use("/api/wos/v2/departments", limiter, departmentRoutes);
    app.use("/api/wos/v2/designations", limiter, designationRoutes);
    app.use("/api/wos/v2/employees", limiter, employeeRoutes);
};