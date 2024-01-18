const express = require('express');
const router = express.Router();
const { filterWorkStatus, countWorkStatus, countTotalWork, countReviewed, workCreatedByDate } = require('../controllers/report');
const { protect, restrict, cacheMiddleware } = require('../middleware/authMiddleware');

router.get("/work", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer"]), cacheMiddleware, filterWorkStatus);
router.get("/work/created/date/:selectedDate", protect, cacheMiddleware, workCreatedByDate);
router.get("/report/work/count/status", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user"]), cacheMiddleware, countWorkStatus);
router.get("/report/work/total/reviewed", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user"]), cacheMiddleware, countReviewed);
router.get("/report/total/work/count", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user"]), cacheMiddleware, countTotalWork);


module.exports = router;