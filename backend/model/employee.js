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
        required: [true, "Please Enter employee phone number"]
    },
    username: {
        type: String,
        required: [true, "Please enter a Username"],
        uppercase: true
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

// Virtual field to calculate the total number of assigned workorders to an employee
employeeSchema.virtual("totalAssignedWorkCount").get(function () {
    return this.assignedWork.length
});

module.exports = mongoose.model("Employee", employeeSchema);