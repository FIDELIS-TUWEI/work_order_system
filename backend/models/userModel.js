const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// schema for storing & validating user data in mongoDB
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: [true, "Please add a name"],
        uppercae: true
    },
    password:{
        type: String,
        required: [true, "Please add a password"],
        minLength: 8,
        select: false
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    // Encrypt password before saving
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

// compare password function
userSchema.methods.comparePasswordInDb = async function(password, passwordDb) {
    return await bcrypt.compare(password, passwordDb);
}

const User = mongoose.model("User", userSchema);

module.exports = User;