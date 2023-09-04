const express = require('express');
const router = express.Router();
const { completedWorkOrder, pendingWorkOrder, inProgressWorkOrder, reviewedWorkOrder, filterWorkStatus } = require('../controllers/report');
const { protect, restrict } = require('../middleware/authMiddleware');

router.get("/pending/work", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), pendingWorkOrder);
router.get("/inprogress/work", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), inProgressWorkOrder);
router.get("/work/complete", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), completedWorkOrder);
router.get("/work/review", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), reviewedWorkOrder);
router.get("/work", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), filterWorkStatus);


module.exports = router;