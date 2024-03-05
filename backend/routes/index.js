module.exports = (app) => {
    // Import Routes
    const authRoutes = require("../routes/authRoutes");
    const userRoutes = require("../routes/userRoutes");
    const workOrderRoutes = require("../routes/workOrderRoutes");
    const locationRoutes = require("../routes/locationRoutes");
    const reportsRoutes = require("../routes/reportRoutes");
    const categoryRoutes = require("../routes/categoryRoutes");
    const departmentRoutes = require("../routes/departmentRoutes");
    const designationRoutes = require("../routes/designationRoutes");
    const employeeRoutes = require("../routes/employeeRoutes");
    const serviceRoutes = require("../routes/serviceRoutes");


    // Routes Middleware
    app.use("/hin", authRoutes);
    app.use("/hin", userRoutes);
    app.use("/hin", workOrderRoutes);
    app.use("/hin", locationRoutes);
    app.use("/hin", reportsRoutes);
    app.use("/hin", categoryRoutes);
    app.use("/hin", departmentRoutes);
    app.use("/hin", designationRoutes);
    app.use("/hin", employeeRoutes);
    app.use("/hin", serviceRoutes);
};