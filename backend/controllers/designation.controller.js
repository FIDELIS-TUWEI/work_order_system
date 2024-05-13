const Designation = require('../model/designation.model');
const asyncHandler = require('express-async-handler');
const logger = require("../utils/logger");

// @desc Create designations
const createDesignation = asyncHandler (async (req, res) => {
   try {
        // Check duplicate
        const duplicate = await Designation.findOne({ designationName: req.body.designationName });
        if (duplicate) {
            return res.status(404).json({ error: "Designation already exists" });
        };
    
        // create new designation
        const newDesignation = new Designation(req.body);
    
        // Save the created designation
        await newDesignation.save();
    
        res.status(201).json(newDesignation);

   } catch (error) {
        logger.error("Error in createDesignation controller", error);
        res.status(500).json({ error: "Internal Server Error" });
   }
});

// @desc Get all designations
const getAllDesignations = asyncHandler (async (req, res) => {
    try {
        // Enable Pagination
        const pageSize = 5;
        const page = Number(req.query.pageNumber) || 1;
        const count = await Designation.find({}).estimatedDocumentCount();
    
        // Find designations
        const designations = await Designation.find({})
            .skip(pageSize * (page - 1))
            .limit(pageSize)
            .exec();
    
        if (!designations) {
            return res.status(404).json({ error: "No designations found" });
        };
    
        res.status(200).json({
            data: designations,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        logger.error("Error in getAllDesignations controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// @desc query all designations
const queryAllDesignations = asyncHandler (async (req, res) => {
    try {
        const designations = await Designation.find({});
    
        if (!designations) {
            return res.status(404).json({ error: "No Designations found" });
        }
    
        res.status(200).json(designations);
    } catch (error) {
        logger.error("Error in queryAllDesignations controller");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// @desc Delete designation
const deleteDesignation = asyncHandler (async (req, res) => {
    try {
        const designationId = req.params.id;
        const designation = await Designation.findByIdAndDelete(designationId);
    
        if (!designation) {
            return res.status(404).json({ error: `Designation with ID: ${designationId} not found` });
        };
    
        res.status(200).json({ message: "Designation deleted successfully" });

    } catch (error) {
        logger.error("Error in deleteDesignation controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = {
    createDesignation,
    getAllDesignations,
    queryAllDesignations,
    deleteDesignation
};