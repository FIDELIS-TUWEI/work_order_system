const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please fill your name"]
    },
    lastName: {
        type: String,
        required: [true, "Please fill your name"]
    },
    phone: {
        type: String,
        required: [true, "Please Enter employee phone number"],
        minlength: [10, "Phone number must have at least (10) numbers"],
    },
    username: {
        type: String,
        required: [true, "Please enter a Username"],
        uppercase: true,
        unique: [true, "Username already exists"],
    },
    assignedWork: [
        {
            type: ObjectId,
            ref: "Workorder"
        }
    ]
},
{
    timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" },
}
);

module.exports = mongoose.model("Employee", employeeSchema);