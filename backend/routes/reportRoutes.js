const express = require('express');
const router = express.Router();
const { filterWorkStatus, countWorkStatus, countTotalWork, countReviewed, workCreatedByDate } = require('../controllers/report');
const { protect, restrict, cacheMiddleware } = require('../middleware/authMiddleware');

router.get("/work", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "maintenance"]), cacheMiddleware, filterWorkStatus);
router.get("/work/created/date/:selectedDate", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "maintenance"]), cacheMiddleware, workCreatedByDate);
router.get("/report/work/count/status", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user", "maintenance"]), cacheMiddleware, countWorkStatus);
router.get("/report/work/total/reviewed", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user", "maintenance"]), cacheMiddleware, countReviewed);
router.get("/report/total/work/count", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user", "maintenance"]), cacheMiddleware, countTotalWork);


module.exports = router;