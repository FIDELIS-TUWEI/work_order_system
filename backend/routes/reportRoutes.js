const express = require('express');
const router = express.Router();
const { completedWorkOrder, pendingWorkOrder, inProgressWorkOrder, reviewedWorkOrder } = require('../controllers/report');
const { protect, restrict } = require('../middleware/authMiddleware');
const { printWorkOrder, generatePDF } = require('../utils/helpers/pdf');

router.get("/pending/work", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), pendingWorkOrder);
router.get("/inprogress/work", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), inProgressWorkOrder);
router.get("/work/complete", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), completedWorkOrder);
router.get("/work/review", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), reviewedWorkOrder);


module.exports = router;