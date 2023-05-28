const mongoose = require("mongoose");

// schema for storing & validating user data in mongoDB
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: [true, "Please add a name"],
        uppercae: true
    },
    password:{
        type: String,
        required: [true, "Please add a password"],
        minLength: 8
    }
}, {
    timestamps: true
});


const User = mongoose.model("User", userSchema);

module.exports = User;