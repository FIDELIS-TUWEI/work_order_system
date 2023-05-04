const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// init express
const app = express();

// port for local
const PORT = process.env.PORT || 5000;

// connect to mongodb DB and start Server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`)
        })
    })
    .catch((error) => console.log(error))
