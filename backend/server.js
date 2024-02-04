require("dotenv").config();
require("../config/connectDB");
const express = require('express');
let app = express();

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