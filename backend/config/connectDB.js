const mongoose = require("mongoose");
const uri = `mongodb+srv://holidayinn:tYKBJbotsd27ijkS@workorderhin.opfay3d.mongodb.net/WorkOrderHIN?retryWrites=true&w=majority`

const connectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Database Connected`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB;