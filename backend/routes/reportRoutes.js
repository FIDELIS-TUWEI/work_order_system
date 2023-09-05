const express = require('express');
const router = express.Router();
const { filterWorkStatus } = require('../controllers/report');
const { protect, restrict } = require('../middleware/authMiddleware');

router.get("/work", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), filterWorkStatus);


module.exports = router;