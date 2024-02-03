module.exports = (app) => {
    const express = require('express');
    const cors = require('cors');
    const rateLimit = require("express-rate-limit");
    const bodyParser = require('body-parser');
    const helmet = require("helmet");
    const morgan = require("morgan");
    const cookieParser = require("cookie-parser");
    const errorHandler = require("../middleware/error");
    const mongoSanitize = require("express-mongo-sanitize");
    const hpp = require("hpp");
    const addKey = require("./addKey");

    // Express trust proxy settings
    app.set('trust proxy', 1)
    app.get('/ip', (request, response) => response.send(request.ip))
    app.get('/x-forwarded-for', (request, response) => response.send(request.headers['x-forwarded-for']));
    app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array

    // Add Key Generator Middleware
    app.use(addKey);

    // Middleware
    let limiter = rateLimit({
        max: 1000,
        windowMs: 60 * 60 * 1000,
        message: "Too many requests from this IP. Please try again later."
    });
    
    app.use('/hin', limiter);
    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" }));
    app.use(morgan('combined'));
    app.use(bodyParser.json({ limit: "5mb" }));
    app.use(bodyParser.urlencoded({ 
        limit: "5mb",
        extended: true 
    }));
    app.use(cors({
        credentials: true,
        origin: ["http://localhost:3000", "https://work-orders.online", "https://www.work-orders.online", "http://3.82.220.3"],
        methods: ["GET", "POST", "PUT", "DELETE"],
    }));
    app.use(cookieParser());
    app.use(express.json()); // To parse JSON data in the request body
    app.use(express.urlencoded({ extended: true })); // To parse form data in the request body
    // Prevent HTTP Parameter pollution
    app.use(hpp());

    // Prevent XSS
    app.use(helmet.contentSecurityPolicy());

    // Prevent SQL Injection
    app.use(mongoSanitize());

    // Error Middleware
    app.use(errorHandler);
}