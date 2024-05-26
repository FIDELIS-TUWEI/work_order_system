const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
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