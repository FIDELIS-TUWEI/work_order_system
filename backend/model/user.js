const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
        required: [true, "Password must have atleast six characters"],
        minLength: 6,
        match: [
            /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
            'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters'
        ]
    },
    role: {
        type: String,
        enum: ["admin", "hod", "user"],
        default: "user"
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
}, { timestamps: true }
);

// Encrypt password
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
    
});

// verify password
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
};

// get Token
userSchema.methods.jwtGenerateToken = function() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.LOGIN_EXPIRES
    });
}

const User = mongoose.model('user', userSchema);

module.exports = User;