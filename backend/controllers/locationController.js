const Location = require("../model/location"); 
const asyncHandler = require("express-async-handler");

// @desc Create locations
// @route POST /locations
// @access Private

const createLocation = asyncHandler(async (req, res) => {
    try {
        const newWorkLocation = new Location(req.body);
        await newWorkLocation.save();
        res.status(201).json({
            success: true,
            data: newWorkLocation
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
});

// @desc Get all locations
// @route GET /all-locations
// @access Private
const getAllLocations = asyncHandler(async (req, res) => {
    try {
        const locations = await Location.find({});

        if (!locations) {
            return res.status(400).json({ message: "No locations found" });
        }
        res.status(200).json({
            success: true,
            data: locations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

module.exports = {
    createLocation,
    getAllLocations
}