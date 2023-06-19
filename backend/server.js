require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const errorHandler = require("./middleware/error");

// Import Routes
const authRoutes = require("./routes/auth-routes");
const taskRoutes = require("./routes/task-routes");
const categoryRoutes = require("./routes/category-routes");

// Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


// Routes Middleware
app.use("/hin", authRoutes);
app.use("/hin", taskRoutes);
app.use("/hin", categoryRoutes);


// Error Middleware
app.use(errorHandler);


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




