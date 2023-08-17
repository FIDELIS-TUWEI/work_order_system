const Location = require("../models/location"); 
const asyncHandler = require("express-async-handler");

// @desc Create locations
// @route POST /locations
// @access Private

const createLocation = asyncHandler(async (req, res) => {
    try {
        const existingLocation = await Location.findOne({ workLocation: req.body.workLocation });
    
        if (existingLocation) {
            return res.status(400).json({ message: "Location already exists" });
        }
        const location = await Location.create(req.body);
        res.status(201).json({
            success: true,
            data: location
        });
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