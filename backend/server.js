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
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

connectDB();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const workOrderRoutes = require("./routes/workOrderRoutes");
const locationRoutes = require("./routes/locationRoutes");
const reportsRoutes = require("./routes/reportRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const designationRoutes = require("./routes/designationRoutes");

// Middleware
app.use(express.json()); // To parse JSON data in the request body
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // To parse form data in the request body
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
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
// Prevent SQL Injection
app.use(mongoSanitize());
// Rate Limit
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: {
        message: "Too many login attempts from this IP, please try again after  a 1 minute interval"
    },
    handler: (req, res, next, options) => {
        res.status(429).json({
            success: false,
            message: options.message
        });
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
// Prevent HTTP Parameter pollution
app.use(hpp());


// Routes Middleware
app.use("/hin", authRoutes);
app.use("/hin", userRoutes);
app.use("/hin", workOrderRoutes);
app.use("/hin", locationRoutes);
app.use("/hin", reportsRoutes);
app.use("/hin", categoryRoutes);
app.use("/hin", departmentRoutes);
app.use("/hin", designationRoutes);


// Error Middleware
app.use(errorHandler);


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





