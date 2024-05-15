require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let JWT_SECRET = process.env.JWT_SECRET;
let NODE_ENV = process.env.NODE_ENV;
let EMAIL = process.env.EMAIL;
let PASSWORD = process.env.PASSWORD;

module.exports = {
    PORT, MONGODB_URI, JWT_SECRET, NODE_ENV, EMAIL, PASSWORD
};