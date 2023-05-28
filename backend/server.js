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
const authRoute = require("./routes/authRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const taskRoutes = require("./routes/taskRoute");

// models
const db = require("./models");
const Role = db.role;

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
app.use("/", taskRoutes);


// Routes Middleware
app.use("/", userRoute);
app.use("/", authRoute);


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
        initial();
    })
});


function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "hod"
            }).save(err => {
                if (err) {
                    console.log("error", err)
                }
                
                console.log("added 'hod' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err)
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}
