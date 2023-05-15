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

// init express
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:5173/"]
}));
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
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`)
        })
    })
    .catch((error) => console.log(error))
