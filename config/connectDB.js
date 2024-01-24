const mongoose = require("mongoose");

const mongoUser = process.env.MONGO_USER
const mongoPass = process.env.MONGO_PASS
const mongoHost = process.env.MONGO_HOST
const mongoDbName = process.env.MONGO_DB_NAME

// Database connection
const mongoURI = process.env.MONGO_URI || `mongodb+srv://${mongoUser}:${mongoPass}@${mongoHost}/${mongoDbName}?retryWrites=true&w=majority`
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