const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("../config/connectDB");
const express = require('express');
let app = express();

connectDB();

// Server Setup
const PORT = process.env.PORT || 5500;

// Middleware
require("./middleware")(app);

//Routes
require("./routes/index")(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error)
});