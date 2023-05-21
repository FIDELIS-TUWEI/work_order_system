const mongoose = require("mongoose");

const connectDB = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        await mongoose.connect(process.env.MONGO_URI, connectionParams);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;