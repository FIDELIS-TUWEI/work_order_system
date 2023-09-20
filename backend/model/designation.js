const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema({
    designationName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Designation", designationSchema);