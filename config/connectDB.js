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

        const connected = await mongoose.connect(mongoURI, options)
        console.log(`Database is connected ${connected.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        
    }
};

module.exports = connectDB


