const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getWorkOrders, getWorkOrder, deleteWorkOrder, displayWork, inAttendanceTracker, inCompleteTracker, attendedTracker } = require('../controllers/work.order.controller');
const { protect, restrict, cacheMiddleware, setVerifiedBy} = require('../middleware/authMiddleware');


router.post("/create/work", protect, restrict(["admin", "hod", "user", "supervisor", "superadmin", "reviewer", "engineer", "maintenance"]), createWorkOrder);
router.get("/work-orders", protect, restrict(["admin", "hod", "supervisor", "superadmin", "reviewer", "engineer", "maintenance"]), cacheMiddleware, getWorkOrders);
router.get("/graph", protect, restrict(["admin", "hod", "supervisor", "superadmin", "reviewer", "engineer", "maintenance"]), cacheMiddleware, displayWork);
router.get("/work/:id", protect, restrict(["admin", "supervisor", "superadmin", "hod", "reviewer", "engineer", "maintenance"]), cacheMiddleware, getWorkOrder);
router.get("/work-orders/in-attendance", protect, restrict(["admin", "hod", "supervisor", "superadmin", "reviewer", "engineer", "maintenance"]), cacheMiddleware, inAttendanceTracker);
router.get("/work-orders/in-complete", protect, restrict(["admin", "hod", "supervisor", "superadmin", "reviewer", "engineer", "maintenance"]), cacheMiddleware, inCompleteTracker);
router.get("/work-orders/attended", protect, restrict(["admin", "hod", "supervisor", "superadmin", "reviewer", "engineer", "maintenance"]), cacheMiddleware, attendedTracker);
router.put("/update/work/:id", protect, restrict(["admin", "supervisor", "superadmin", "reviewer", "engineer", "hod", "maintenance"]), setVerifiedBy, updateWorkOrder);
router.delete("/work/:id", protect, restrict(["admin", "superadmin"]), deleteWorkOrder);

module.exports = router;