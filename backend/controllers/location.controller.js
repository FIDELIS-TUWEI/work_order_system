const Location = require("../model/location.model"); 
const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger");

// @desc Create locations
// @route POST /locations
// @access Private

const createLocation = asyncHandler (async (req, res) => {
    try {
        // Check duplicate location
        const duplicate = await Location.findOne({ locationTitle: req.body.locationTitle });
        if (duplicate) {
            return res.status(400).json({ message: "Location already exists" });
        };
        
        // Create new location
        const newWorkLocation = new Location(req.body);
    
        // Save the created location
        await newWorkLocation.save();
        res.status(201).json({ data: newWorkLocation });

    } catch (error) {
        logger.error("Error in createLocation controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// @desc Get all locations
// @route GET /all-locations
// @access Private
const getLocations = asyncHandler (async (req, res) => {
    try {
        // Enable Pagination
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;
        const count = await Location.find({}).estimatedDocumentCount();
    
        // Find locations in DB
        const locations = await Location.find({})
            .skip(pageSize * (page - 1))
            .limit(pageSize)
    
        if (!locations) {
            return res.status(404).json({ error: "Locations not found!" });
        };
    
        res.status(200).json({
            data: locations,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        logger.error("Error in getLocations controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Query to get all locations
const queryLocations = asyncHandler (async (req, res) => {
    try {
        const locations = await Location.find({});
    
        if (!locations) {
            return res.status(404).json({ error: "Locations not found!" });
        }
        res.status(200).json({ data: locations });
    } catch (error) {
        logger.error("Error in queryLocations controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// @desc Delete location
// @route DELETE /delete/location/:id
// @access Private
const deleteLocation = asyncHandler (async (req, res, next) => {
    try {
        const locationId = req.params.id;
        const deleteLocation = await Location.findByIdAndDelete(locationId);
    
        if (!deleteLocation) {
            return res.status(404).json({ error: "Location not found!" });
        };
    
        return res.status(200).json({ message: "Location deleted successfully" });
    } catch (error) {
        logger.error("Error in deleteLocation controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = {
    createLocation,
    getLocations,
    queryLocations,
    deleteLocation
};