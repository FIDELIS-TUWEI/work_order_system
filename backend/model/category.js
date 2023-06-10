const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["Fix", "Replace", "Repair"],
        required: [true, "Please select status for work assigned"]
    }
})

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;