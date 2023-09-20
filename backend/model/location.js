const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    locationTitle: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Location", locationSchema);