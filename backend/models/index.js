const mongoose = require("mongoose");

mongoose.promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./userModel");
db.role = require("./role");

db.ROLES = ["user", "admin", "hod"];

module.exports = db;