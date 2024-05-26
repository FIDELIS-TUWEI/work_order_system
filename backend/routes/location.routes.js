const express = require('express');
const router = express.Router();
const { createLocation, getLocations, deleteLocation, queryLocations } = require('../controllers/location.controller');
const { protect, restrict, cacheMiddleware } = require('../middleware/authMiddleware');


router.post("/new", protect, restrict(["admin", "superadmin"]), createLocation);
router.get("/", protect, restrict(["admin", "superadmin"]), cacheMiddleware, getLocations);
router.get("/search", protect, restrict(["admin", "superadmin", "hod", "reviewer", "engineer", "user", "supervisor", "maintenance"]), cacheMiddleware, queryLocations);
router.delete("/:id", protect, restrict(["admin", "superadmin"]), deleteLocation);

module.exports = router;