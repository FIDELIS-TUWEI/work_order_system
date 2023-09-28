const express = require('express');
const router = express.Router();
const { createLocation, getAllLocations, deleteLocation, queryAllLocations } = require('../controllers/locationController');
const { protect, restrict } = require('../middleware/authMiddleware');


router.post("/create/location", protect, restrict(["admin", "superadmin"]), createLocation);
router.get("/all-locations", protect, restrict(["admin", "superadmin"]), getAllLocations);
router.get("/query/locations", protect, restrict(["admin", "superadmin", "hod", "reviewer", "engineer", "user"]), queryAllLocations);
router.delete("/delete/location/:id", protect, restrict(["admin", "superadmin"]), deleteLocation);

module.exports = router;