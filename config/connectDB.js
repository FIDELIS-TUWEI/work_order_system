const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = async () => {
    try {
        // Database connection
        const mongoURI = process.env.MONGO_URI
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        await mongoose.connect(mongoURI, options)
        console.log(`MongoDB Database is connected Succesfully.`);
    } catch (error) {
        console.log(`Error connecting to MongoDB, ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;