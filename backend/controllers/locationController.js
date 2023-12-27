const Location = require("../model/location"); 
const asyncHandler = require("express-async-handler");

// @desc Create locations
// @route POST /locations
// @access Private

const createLocation = asyncHandler(async (req, res) => {
    try {
        // Check duplicate location
        const duplicate = await Location.findOne({ locationTitle: req.body.locationTitle });
        if (duplicate) {
            return res.status(400).json({
                success: false,
                message: "Location already exists",
            });
        };
        
        // Create new location
        const newWorkLocation = new Location(req.body);
        if (!newWorkLocation) {
            return res.status(400).json({
                success: false,
                message: "Location not created",
            });
        };

        // Save the created location
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
    // Enable Pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Location.find({}).estimatedDocumentCount();
    try {
        const locations = await Location.find({})
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        if (!locations) {
            return res.status(400).json({ message: "No locations found" });
        }
        res.status(200).json({
            success: true,
            data: locations,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Query to get all locations
const queryAllLocations = asyncHandler(async (req, res) => {
    try {
        const locations = await Location.find({});
        res.status(200).json({
            success: true,
            data: locations
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
})

// @desc Delete location
// @route DELETE /delete/location/:id
// @access Private
const deleteLocation = asyncHandler(async (req, res) => {
    try {
        const locationId = req.params.id;
        const deleteLocation = await Location.findByIdAndDelete(locationId);

        if (!deleteLocation) {
            return res.status(404).json({ message: "Location not found" });
        };

        return res.status(200).json({
            success: true,
            message: "Location deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
})

module.exports = {
    createLocation,
    getAllLocations,
    queryAllLocations,
    deleteLocation
};