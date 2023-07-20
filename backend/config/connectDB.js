const mongoose = require("mongoose");
const { MONGO_URI } = require("../utils/env");

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDB;