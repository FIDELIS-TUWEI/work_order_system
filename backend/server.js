const dotenv = require("dotenv")
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const taskRoutes = require("./routes/taskRoute");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConnect");
const PORT = process.env.PORT || 5000;

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

// Routes Middleware
app.use("/", userRoute);
app.use("/", taskRoutes);


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

