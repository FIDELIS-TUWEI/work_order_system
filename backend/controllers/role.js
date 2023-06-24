const asyncHandler = require("express-async-handler");
const Role = require("../model/role");

// create a new role in DB
const assignRole = asyncHandler (async (req, res, next) => {
    try {
        if (req.body.role && req.body !== "") {
            const newRole = new Role(req.body);
            await newRole.save();
            return res.status(200).json({ message: "Role created succesfully" });
        } else {
            return res.status(400).json({ message: "Bad request" });
        }
    } catch (error) {
        next(error);
    }
});

// update Role
const updateRole = asyncHandler (async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const updateRole = await Role.findByIdAndUpdate(id, { role });
        if (!updateRole) {
            return res.status(404).json({ message: "No role found" })
        }

        res.status(200).json({
            success: true,
            message: "Role Updated" 
            });
    } catch (error) {
        next(error);
    }
});

// Get All Roles
const getAllRoles = asyncHandler (async (req, res, next) => {
    try {
        const role = await Role.find({});
        res.status(200).json({
            success: true,
            role
        });
    } catch (error) {
        next(error);
    }
})

module.exports = {assignRole, updateRole, getAllRoles};