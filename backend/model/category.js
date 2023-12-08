const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryTitle: {
        type: String,
        required: true
    },
},
{
    timestamps: true 
}
);

module.exports = mongoose.model("Category", categorySchema);