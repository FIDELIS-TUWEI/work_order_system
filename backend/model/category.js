const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryTitle: {
        type: String,
        required: true
    },
},
{
    timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" },
}
);

module.exports = mongoose.model("Category", categorySchema);