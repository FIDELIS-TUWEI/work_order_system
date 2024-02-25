const connectDB = require("../config/connectDB");
const express = require('express');
const cookieParser = require("cookie-parser");
const errorHandler = require("./controllers/errorController");
const CustomError = require("./utils/CustomError");

let app = express();

connectDB();

app.use(cookieParser());

// Server Setup
const PORT = process.env.PORT || 5000;

// Middleware
require("./middleware")(app);

//Routes
require("./routes/index")(app);

// Create route
app.get("/", (req, res) => {
    res.send("Server is running");
})

// Error logic
app.all('*', (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
})

// Error Middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error)
});