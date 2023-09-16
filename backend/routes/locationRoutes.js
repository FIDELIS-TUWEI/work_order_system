const express = require('express');
const router = express.Router();
const { createLocation, getAllLocations } = require('../controllers/locationController');
const { protect, restrict } = require('../middleware/authMiddleware');


router.post("/create/location", protect, restrict(["admin", "superadmin"]), createLocation);
router.get("/all-locations", protect, restrict(["admin", "superadmin", "hod", "reviewer", "engineer"]), getAllLocations);

module.exports = router;