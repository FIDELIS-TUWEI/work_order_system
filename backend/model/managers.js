const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const { ObjectId } = mongoose.Schema;

const managerSchema = new mongoose.Schema({
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^.+@.+$/
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    },
    workOrders: [
        {
            type: ObjectId,
            ref: "Workorder"
        },
    ],
}, 

{ 
    timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" }, 
}
);

// Function to encrypt password in Database with Salt rounds
managerSchema.pre("save", async function (next) {
    const manager = this;

    try {
        if (manager.isModified("password") || manager.isNew) {
            const hashedPassword = await bcrypt.hash(manager.password, 10);
            manager.password = hashedPassword;
        }
        next()
    } catch (err) {
        next(err)
    }
});

// Function to compare password in Database
managerSchema.methods.comparePasswords = function (password) {
    const manager = this;
    return bcrypt.compare(password, manager.password);
};

module.export = mongoose.model("Managers", managerSchema);