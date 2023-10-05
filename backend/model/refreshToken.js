const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);