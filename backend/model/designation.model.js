const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema({
    designationName: {
        type: String,
        required: true
    }
},
{
    timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" },
}
);

module.exports = mongoose.model("Designation", designationSchema);