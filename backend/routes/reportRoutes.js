const express = require('express');
const router = express.Router();
const { filterWorkStatus, countWorkStatus, countTotalWork, workCreatedByDate, countWorkTracker } = require('../controllers/report');
const { protect, restrict, cacheMiddleware } = require('../middleware/authMiddleware');

router.get("/work", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "maintenance"]), cacheMiddleware, filterWorkStatus);
router.get("/report/work/count/tracker", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user", "maintenance"]), cacheMiddleware, countWorkTracker);
router.get("/work/created/date/:selectedDate", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "maintenance"]), cacheMiddleware, workCreatedByDate);
router.get("/report/work/count/status", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user", "maintenance"]), cacheMiddleware, countWorkStatus);
router.get("/report/total/work/count", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user", "maintenance"]), cacheMiddleware, countTotalWork);


module.exports = router;