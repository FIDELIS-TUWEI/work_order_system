const ServiceType = require("../model/serviceType");
const asyncHandler = require("express-async-handler");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");

const createService = asyncHandler (asyncErrorHandler (async(req, res, next) => {
    // check duplicate service
    const exists = await ServiceType.findOne({ serviceTitle: req.body.serviceTitle });

    if (exists) {
        const error = new CustomError("Service Type Already exists!");
        return next(error);
    }

    // new service type
    const newService = new ServiceType(req.body);
    if (!newService) {
        const error = new CustomError("Failed to create new Service Type");
        return next(error);
    };

    // Save the created service type
    await newService.save();
    res.status(201).json({
        success: true,
        data: newService
    });
}));

// Get All Service Types
const allServiceTypes = asyncHandler (asyncErrorHandler (async(req, res, next) => {
    // Enable pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await ServiceType.find({}).estimatedDocumentCount();

    // Find serviceTypes in the DB
    const services = await ServiceType.find({})
        .skip(pageSize * (page - 1))
        .limit(pageSize)

    if (!services) {
        const error = new CustomError("No Service Types found!", 404);
        return next(error);
    };

    res.status(200).json({
        success: true,
        data: services,
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
}));

// Query service types without pagination
const queryServices = asyncHandler (asyncErrorHandler (async(req, res, next) => {
    // Find services in DB
    const services = await ServiceType.find({});

    if (!services) {
        const error = new CustomError("No Service Types found!");
        return next(error);
    };

    res.status(200).json({
        success: true,
        data: services
    });
}));

// Edit Services
const updateService = asyncHandler (asyncErrorHandler (async(req, res, next) => {
    const serviceId = req.params.id;
    const service = req.body;
    const editService = await ServiceType.findById(serviceId, service, { new: true, runValidators: true });

    if (!editService) {
        const error = new CustomError("Service Type not found!", 404)
        return next(error);
    };

    res.status(200).json({
        success: true,
        data: editService
    });
}));

// Delete Service
const deleteService = asyncHandler (asyncErrorHandler (async(req, res, next) => {
    const serviceId = req.params.id;
    const removeService = await ServiceType.findById(serviceId);

    if (!removeService) {
        const error = new CustomError("Service Type not found!", 404);
        return next(error);
    };

    return res.status(204).json({
        success: true,
        message: "Service Type deleted"
    })
}))

module.exports = {
    createService,
    allServiceTypes,
    queryServices,
    updateService, 
    deleteService
}
