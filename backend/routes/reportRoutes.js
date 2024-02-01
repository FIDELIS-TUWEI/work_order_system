const express = require('express');
const router = express.Router();
const { filterWorkStatus, countWorkStatus, countTotalWork, countReviewed, workCreatedByDate } = require('../controllers/report');
const { restrict, cacheMiddleware } = require('../middleware/authMiddleware');

router.get("/work", restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer"]), cacheMiddleware, filterWorkStatus);
router.get("/work/created/date/:selectedDate", restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer"]), cacheMiddleware, workCreatedByDate);
router.get("/report/work/count/status", restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user"]), cacheMiddleware, countWorkStatus);
router.get("/report/work/total/reviewed", restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user"]), cacheMiddleware, countReviewed);
router.get("/report/total/work/count", restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user"]), cacheMiddleware, countTotalWork);


module.exports = router;