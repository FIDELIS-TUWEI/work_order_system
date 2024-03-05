const mongoose = require("mongoose");

const serviceTypeSchema = new mongoose.Schema({
    serviceTitle: {
        type: String,
        required: true
    },
}, {
    timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" },
}
);

module.exports = mongoose.model("ServiceType", serviceTypeSchema);