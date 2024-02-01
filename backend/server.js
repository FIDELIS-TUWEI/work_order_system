const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("../config/connectDB");
const express = require('express');
//const rateLimit = require("express-rate-limit");
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const errorHandler = require("./middleware/error");

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

connectDB();
dotenv.config();

let app = express();

//Enable trust proxy settings
//app.set("trust-proxy", true);

// Middleware
app.use(helmet());

//let limiter = rateLimit({
//    max: 100,
//    windowMs: 24 * 60 * 60 * 1000,
//    message: "Too many requests from this IP. Please try again later.",
//    standardHeader: true,
//    legacyHeaders: false,
//});

//app.use('/hin', limiter);
app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" }));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ 
    limit: "5mb",
    extended: true 
}));
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://www.work-orders.online", "http://54.227.144.85"],
    methods: ["GET", "POST", "PUT", "DELETE"],
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

// Import Routes
const routes = {
    authRoutes: require("./routes/authRoutes"),
    userRoutes: require("./routes/userRoutes"),
    workOrderRoutes: require("./routes/workOrderRoutes"),
    locationRoutes: require("./routes/locationRoutes"),
    reportRoutes: require("./routes/reportRoutes"),
    categoryRoutes: require("./routes/categoryRoutes"),
    departmentRoutes: require("./routes/departmentRoutes"),
    designationRoutes: require("./routes/designationRoutes"),
    employeeRoutes: require("./routes/employeeRoutes"),
}

// Routes Middleware
Object.values(routes).forEach((route) => app.use("/hin", route));


app.get('/', (req, res) => res.send("Server is ready"));
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        errors: [
            {
                message: "Route not found",
            },
        ],
    })
})

// Error Middleware
//app.use(notFound);
app.use(errorHandler);

// Server Setup
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});