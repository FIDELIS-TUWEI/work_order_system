const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const Task = require("./models/taskModel");
const taskRoutes = require("./routes/taskRoute");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConnect");
const PORT = process.env.PORT || 5000;

connectDB();

// init express
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/tasks", taskRoutes);

// Routes Middleware
app.use("/api/users", userRoute);

// Routes
app.get("/", (req, res) => {
    res.send("Home Page")
});

// Error middleware
app.use(errorHandler);

// connect to mongodb DB and start Server
mongoose.connection.once('open', () => {
    console.log('Connected to Database')
    app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`)
    })
});

