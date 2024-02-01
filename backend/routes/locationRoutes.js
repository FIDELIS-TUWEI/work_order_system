const express = require('express');
const router = express.Router();
const { createLocation, getAllLocations, deleteLocation, queryAllLocations } = require('../controllers/locationController');
const { restrict, cacheMiddleware } = require('../middleware/authMiddleware');


router.post("/create/location", restrict(["admin", "superadmin"]), createLocation);
router.get("/all-locations", restrict(["admin", "superadmin"]), cacheMiddleware, getAllLocations);
router.get("/search/location", restrict(["admin", "superadmin", "hod", "reviewer", "engineer", "user", "supervisor"]), cacheMiddleware, queryAllLocations);
router.delete("/delete/location/:id", restrict(["admin", "superadmin"]), deleteLocation);

module.exports = router;