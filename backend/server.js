const dotenv = require("dotenv")
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const createHttpError = require("http-errors");

// Db connection
const connectDB = require("./config/dbConnect");
const PORT = process.env.PORT || 5000;

// routes
const userRouter = require("./routes/User-route");
const taskRoutes = require("./routes/Task-Route");


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
app.use("/hin", userRouter);


// Routes
app.get("/", (req, res) => {
    res.send("Home Page")
});

// Error middleware
app.use((req, res, next) => {
    next(createHttpError.NotFound())
});

app.use((error, req, res, next) => {
    error.status = error.status;
    res.status(error.status);
    res.send(error);
})

// connect to mongodb DB and start Server
mongoose.connection.once('open', () => {
    console.log('Connected to Database')
    app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`)
    })
});

