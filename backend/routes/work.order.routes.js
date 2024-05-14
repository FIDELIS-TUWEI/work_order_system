const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getWorkOrders, getWorkOrder, deleteWorkOrder, displayWork, inAttendanceTracker, inCompleteTracker, attendedTracker } = require('../controllers/work.order.controller');
const { protect, restrict, cacheMiddleware} = require('../middleware/authMiddleware');


router.post("/new/work", protect, createWorkOrder);
router.get("/all", protect, cacheMiddleware, getWorkOrders);
router.get("/graph", protect, cacheMiddleware, displayWork);
router.get("/work/:id", protect, cacheMiddleware, getWorkOrder);
router.get("/work/in-attendance", protect, cacheMiddleware, inAttendanceTracker);
router.get("/work/in-complete", protect, cacheMiddleware, inCompleteTracker);
router.get("/work/attended", protect, cacheMiddleware, attendedTracker);
router.put("/update/:id", protect, restrict(["admin", "engineer", "superadmin", "maintenance"]), updateWorkOrder);
router.delete("/work/:id", protect, restrict(["admin", "superadmin"]), deleteWorkOrder);

module.exports = router;