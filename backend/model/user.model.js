const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const validator = require("validator")

// User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please Enter a valid email']
    },
    username: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "hod", "admin", "supervisor", "superadmin", "reviewer", "engineer", "maintenance"],
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
        type: ObjectId,
        ref: "Department"
    },
    designation: {
        type: ObjectId,
        ref: "Designation"
    },
    workOrders: [
        {
            type: ObjectId,
            ref: "Workorder"
        }
    ],
}, 
{ 
    timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" }, 
}
);

module.exports = mongoose.model('User', userSchema);