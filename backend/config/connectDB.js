const mongoose = require("mongoose");

const uri = `mongodb+srv://holidayinn:tYKBJbotsd27ijkS@workorderhin.opfay3d.mongodb.net/Work-Order?retryWrites=true&w=majority`

const connectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        //await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDB;