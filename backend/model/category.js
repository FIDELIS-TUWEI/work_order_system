const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryTitle: {
        type: String,
    },
});

module.exports = mongoose.model("Category", categorySchema);