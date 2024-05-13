const express = require('express');
const router = express.Router();
const { createLocation, getLocations, deleteLocation, queryLocations } = require('../controllers/location.controller');
const { protect, restrict, cacheMiddleware } = require('../middleware/authMiddleware');


router.post("/create/location", protect, restrict(["admin", "superadmin"]), createLocation);
router.get("/locations", protect, restrict(["admin", "superadmin"]), cacheMiddleware, getLocations);
router.get("/search/location", protect, restrict(["admin", "superadmin", "hod", "reviewer", "engineer", "user", "supervisor", "maintenance"]), cacheMiddleware, queryLocations);
router.delete("/location/:id", protect, restrict(["admin", "superadmin"]), deleteLocation);

module.exports = router;