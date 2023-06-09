const mongoose = require("mongoose");
const validate  = require("validatorjs");

const userSchema = new mongoose.Schema({
    name: {
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
        required: [true, "Please enter a password"],
        minLength: 6,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please fill your password to confirm"],
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: "Your password and confirmation password are not the same!",
        },
    },
    role: {
        type: String,
        enum: ["user", "hod", "admin"],
        default: "hod"
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