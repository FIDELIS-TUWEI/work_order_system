const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const morgan = require("morgan");
const app = express();

const middleware = require("./utils/middleware");
const CustomError = require("./utils/CustomError");
const appRoutes = require("./routes/index");

// Express trust proxy settings
app.set("trust proxy", 1);
app.get("/ip", (req, res) => res.send(req.ip));
app.get("x-forwarded-for", (req, res) => res.send(req.headers["x-forwarded-for"]));
app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]); // specify multiple subnets as an array

// Body parsers
app.use(express.json({ limit: "5mb" })); //  to parse req.body // limit shouldn.t be too high to prevent DoS attack
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

// Cookie parser
app.use(cookieParser());

// CORS 
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://work-orders.online", "https://www.work-orders.online"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
}));

// Add key generator middleware
app.use(middleware.addKey);

// Security headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" }));
app.use(helmet.contentSecurityPolicy()); // prevent XSS

// Logging
app.use(morgan('dev')); // switch to 'combined' when in production

// Sanitization
app.use(mongoSanitize()); // prevent SQL injection
app.use(hpp()); // prevent HTTP parameter pollution

app.disable("x-powered-by"); // disable server fingerprinting

app.get("/", (req, res) => {
    res.json({ message: "Backend Server is ready!"});
});

app.use(appRoutes); // application routes from the index file

app.all('*', (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
});

app.use(middleware.unknownEndpoint);

module.exports = app;