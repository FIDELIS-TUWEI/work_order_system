const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please fill your name"]
    },
    lastName: {
        type: String,
        required: [true, "Please fill your name"]
    },
    username: {
        type: String,
        required: [true, "Please enter a Username"],
        uppercase: true
    },
    password: {
        type: String,
        required: [true, "Password must have atleast six characters"],
        minLength: 6,
        match: [
            /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
            'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters'
        ]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    roles: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "role"
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
}, { timestamps: true }
);

const User = mongoose.model('user', userSchema);

module.exports = User;