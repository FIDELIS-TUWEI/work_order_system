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

connectDB();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const workOrderRoutes = require("./routes/workOrderRoutes");
const locationRoutes = require("./routes/locationRoutes");
const reportsRoutes = require("./routes/reportRoutes");

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


// Routes Middleware
app.use("/hin", authRoutes);
app.use("/hin", userRoutes);
app.use("/hin", workOrderRoutes);
app.use("/hin", locationRoutes);
app.use("/hin", reportsRoutes);


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





