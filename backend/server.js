const dotenv = require("dotenv").config();
const express = require('express');
const connectDB = require("./config/connectDB");
const User = require("./model/user");
const userRoute = require("./routes/user-routes");

const app = express();

// Middleware
app.use(express.json);
app.use(express.urlencoded({extended: true}));

// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use("/hin", userRoute);

const PORT = process.env.PORT || 5000


// start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();




