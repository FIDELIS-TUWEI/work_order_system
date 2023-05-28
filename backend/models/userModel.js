const mongoose = require("mongoose");

// schema for storing & validating user data in mongoDB
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: [true, "Please add a name"]
    },
    password:{
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be 6 characters"]
    },
    roles: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
}, {
    timestamps: true
});


const User = mongoose.model("User", userSchema);

module.exports = User;