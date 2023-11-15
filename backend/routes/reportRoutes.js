const express = require('express');
const router = express.Router();
const { filterWorkStatus, countPendingWorkOrders, countInProgressWorkOrders, countCompletedWorkOrders, countReviewedWorkOrders, countAllWorkOrders, filterWorkDateCreated } = require('../controllers/report');
const { protect, restrict } = require('../middleware/authMiddleware');

router.get("/work", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer"]), filterWorkStatus);
router.get("/work/date-created", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer"]), filterWorkDateCreated);
router.get("/count/pending-status", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user"]), countPendingWorkOrders);
router.get("/count/in-progress-status", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user"]), countInProgressWorkOrders);
router.get("/count/completed-status", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user"]), countCompletedWorkOrders);
router.get("/count/reviewed-status", protect, restrict(["admin", "hod", "reviewer", "supervisor", "superadmin", "engineer", "user"]), countReviewedWorkOrders);
router.get("/count/total-work", protect, restrict(["admin", "superadmin", "user", "hod", "engineer", "reviewer", "supervisor"]), countAllWorkOrders)


module.exports = router;