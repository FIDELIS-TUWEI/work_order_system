const connectDB = require("../config/connectDB");
const express = require('express');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

let app = express();

connectDB();

app.use(cookieParser());

// Server Setup
const PORT = process.env.PORT || 5000;

// Middleware
require("./middleware")(app);

//Routes
require("./routes/index")(app);

// Error Middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

// Create route
app.get("/", (req, res) => {
    res.send("Server is running");
})

process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error)
});