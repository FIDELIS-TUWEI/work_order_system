const express = require('express');
const router = express.Router();
const { createLocation, getAllLocations, deleteLocation, queryAllLocations } = require('../controllers/location.controller');
const { protect, restrict, cacheMiddleware } = require('../middleware/authMiddleware');


router.post("/create/location", protect, restrict(["admin", "superadmin"]), createLocation);
router.get("/all-locations", protect, restrict(["admin", "superadmin"]), cacheMiddleware, getAllLocations);
router.get("/search/location", protect, restrict(["admin", "superadmin", "hod", "reviewer", "engineer", "user", "supervisor", "maintenance"]), cacheMiddleware, queryAllLocations);
router.delete("/delete/location/:id", protect, restrict(["admin", "superadmin"]), deleteLocation);

module.exports = router;