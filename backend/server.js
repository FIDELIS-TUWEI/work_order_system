const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("../config/connectDB");
const express = require('express');
const cookieParser = require("cookie-parser");

let app = express();

connectDB();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'dist')));
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Server Setup
const PORT = process.env.PORT || 5500;

// Middleware
require("./middleware")(app);

//Routes
require("./routes/index")(app);

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