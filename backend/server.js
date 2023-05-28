const dotenv = require("dotenv")
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Db connection
const connectDB = require("./config/dbConnect");
const PORT = process.env.PORT || 5000;

// routes
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const taskRoutes = require("./routes/taskRoute");


// init express
const app = express();

dotenv.config();
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/hin", taskRoutes);


// Routes Middleware
app.use("/hin", userRoute);


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

