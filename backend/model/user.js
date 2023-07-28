const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { LOGIN_EXPIRES, JWT_SECRET } = require("../utils/env");
const { ObjectId } = mongoose.Schema;

// User Schema
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
    role: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true,
    },
    date: {
        type: String,
        required: true,
    },
    workOrders: [
        {
            type: ObjectId,
            ref: "Workorder",
            required: true
        }
    ],
}, 
{ 
    timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" }, 
}
);

// Encrypt Password before Saving to DB
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password in the database
userSchema.methods.comparePassword = async function(enteredPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
}

//userSchema.methods.getJwtToken = function () {
//    const payload = { id: this.id };
//    const secret = JWT_SECRET;
//    const expiresIn = LOGIN_EXPIRES;
//    return jwt.sign(payload, secret, { expiresIn });
//};

module.exports = mongoose.model('User', userSchema);