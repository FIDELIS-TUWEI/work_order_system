const express = require('express');
const app = express();
require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const errorHandler = require("./middleware/error");

// Import Routes
const authRoutes = require("./routes/auth-routes");
const taskRoutes = require("./routes/task-routes");
const categoryRoutes = require("./routes/category-routes");

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: true
}));
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




