const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    locationTitle: {
        type: String,
    }
});

module.exports = mongoose.model("Location", locationSchema);