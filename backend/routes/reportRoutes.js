const express = require('express');
const router = express.Router();
const { filterWorkStatus, dailyWorkOrders, weeklyWorkOrders } = require('../controllers/report');
const { protect, restrict } = require('../middleware/authMiddleware');

router.get("/work", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin"]), filterWorkStatus);
router.get("/daily/work/report", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin"]), dailyWorkOrders);
router.get("/weekly/work/report", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin"]), weeklyWorkOrders);


module.exports = router;