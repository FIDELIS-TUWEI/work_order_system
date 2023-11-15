require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/error");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

// Connect to MongoDB Database
connectDB();

// Middleware
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" }));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ 
    limit: "5mb",
    extended: true 
}));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(cookieParser());
app.use(express.json()); // To parse JSON data in the request body
app.use(express.urlencoded({ extended: true })); // To parse form data in the request body
// Prevent HTTP Parameter pollution
app.use(hpp());

// Prevent XSS
app.use(helmet.contentSecurityPolicy());

// Prevent SQL Injection
app.use(mongoSanitize());

// Error Middleware
app.use(errorHandler);

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const workOrderRoutes = require("./routes/workOrderRoutes");
const locationRoutes = require("./routes/locationRoutes");
const reportsRoutes = require("./routes/reportRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const designationRoutes = require("./routes/designationRoutes");
const employeeRoutes = require("./routes/employeeRoutes");


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


const PORT = process.env.PORT || 5000
// start server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

mongoose.connection.on('error', err => {
    console.log(err)
});





