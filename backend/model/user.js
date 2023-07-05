const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Task History
const taskHistorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    location: {
        type: String,
    },
    completedDate: {
        type: Date,
    },
    taskStatus: {
        type: String,
        enum: ["Pending", "Completed", "Inspected"],
        default: "Pending"
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true }
);

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
        required: [true, "Password is required"],
        minLength: [6, "Password must have at least (6) characters"],
    },
    taskHistory: [taskHistorySchema],
    role: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
}, { timestamps: true }
);

// Encrypt Password before Saving to DB
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare User Password in DB
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return a JWT Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.LOGIN_EXPIRES
    });
};

module.exports = mongoose.model('User', userSchema);