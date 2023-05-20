const express = require("express");
const router = express.Router();
const { 
    addUser, getUsers, getUser
} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");

// user route
router.post("/add", addUser);
router.get("/all", getUsers);
router.get("/:id", getUser);

module.exports = router;