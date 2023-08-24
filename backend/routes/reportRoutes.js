const express = require('express');
const router = express.Router();
const { completedWorkOrder, pendingWorkOrder } = require('../controllers/report');
const { protect, restrict } = require('../middleware/authMiddleware');


router.get("/work/complete", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), completedWorkOrder)
router.get("/pending/work", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), pendingWorkOrder);


module.exports = router