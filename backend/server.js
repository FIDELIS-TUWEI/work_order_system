const express = require('express');
const connectDB = require("./config/connectDB");
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const User = require("./model/user");
const userRoute = require("./routes/user-routes");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
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




