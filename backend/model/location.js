const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    locationTitle: {
        type: String,
        required: true
    }
},
{
    timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" },
}
);

module.exports = mongoose.model("Location", locationSchema);