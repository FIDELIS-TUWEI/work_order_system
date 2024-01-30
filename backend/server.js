const dotenv = require("dotenv")
const connectDB = require("../config/connectDB");
const express = require('express');
const rateLimit = require("express-rate-limit");
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

dotenv.config();
let app = express();
connectDB();

// Middleware
app.use(helmet());

//Enable trust proxy settings
app.set("trust-proxy", true);

let limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP. Please try again later."
});

app.use('/hin', limiter);
app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" }));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ 
    limit: "5mb",
    extended: true 
}));
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://www.work-orders.online"],
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

// Error Middleware
app.use(errorHandler);

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

// Server Setup
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});