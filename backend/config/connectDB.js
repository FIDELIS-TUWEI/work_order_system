const mongoose = require("mongoose");

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDB;