const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema;

// User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please fill your name"]
    },
    lastName: {
        type: String,
        required: [true, "Please fill your name"]
    },
    email: {
        type: String,
        required: [true, "Please fill your email"],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email"]
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
        type: String,
        enum: ["user", "hod", "admin", "supervisor", "superadmin", "reviewer", "engineer"],
        default: "user",
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true,
    },
    department: {
        type: String,
    },
    designation: {
        type: String,
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

module.exports = mongoose.model('User', userSchema);