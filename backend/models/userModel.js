const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

// Encrypt password before saving to DB
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;