const asyncHandler = require("express-async-handler");
const Role = require("../model/role");

// create a new role in DB
const assignRole = asyncHandler (async (req, res, next) => {
    try {
        if (req.body.role && req.body !== "") {
            const newRole = new Role(req.body);
            await newRole.save();
            return res.status(201).json({ message: "Role created succesfully" });
        } else {
            return res.status(400).json({ message: "Bad request" });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = {assignRole};