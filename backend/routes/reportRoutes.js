const express = require('express');
const router = express.Router();
const { filterWorkStatus, countPendingWorkOrders, countInProgressWorkOrders, countCompletedWorkOrders, countReviewedWorkOrders, countAllWorkOrders, fetchWorkOrdersByDate } = require('../controllers/report');
const { protect, restrict, cacheMiddleware } = require('../middleware/authMiddleware');

router.get("/work", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer"]), cacheMiddleware, filterWorkStatus);
router.get("work/date-created/:date", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer"]), cacheMiddleware, fetchWorkOrdersByDate);
router.get("/count/pending-status", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user"]), cacheMiddleware, countPendingWorkOrders);
router.get("/count/in-progress-status", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user"]), cacheMiddleware, countInProgressWorkOrders);
router.get("/count/completed-status", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user"]), cacheMiddleware, countCompletedWorkOrders);
router.get("/count/reviewed-status", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user"]), cacheMiddleware, countReviewedWorkOrders);
router.get("/count/total-work", protect, restrict(["admin", "superadmin", "user", "hod", "engineer", "reviewer", "supervisor"]), cacheMiddleware, countAllWorkOrders)


module.exports = router;