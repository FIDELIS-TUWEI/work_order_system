const mongoose = require("mongoose");
const validator  = require("validatorjs");
const bcrypt = require("bcryptjs");

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

// Mongoose Document middleware
userSchema.pre("save", async function(next) {
    try {
       // check if password is modified
        if (!this.isModified("password")) {
            return next();
        }

        // Hash passord
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword 
        }
        
    } catch (error) {
        next(error);
    }
    
})

const User = mongoose.model('user', userSchema);

module.exports = User;