const mongoose = require("mongoose");

// Database connection
const mongoURI = process.env.MONGO_URI;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose
    .connect(mongoURI, options)
    .then(() => {
        console.log('Database connected successfully!');
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });