const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getWorkOrders, getWorkOrder, deleteWorkOrder, displayWork, inAttendanceTracker, inCompleteTracker, attendedTracker } = require('../controllers/work.order.controller');
const { protect, restrict, cacheMiddleware} = require('../middleware/authMiddleware');


router.post("/new", protect, createWorkOrder);
router.get("/", protect, cacheMiddleware, getWorkOrders);
router.get("/graph", protect, cacheMiddleware, displayWork);
router.get("/:id", protect, cacheMiddleware, getWorkOrder);
router.get("/in-attendance", protect, cacheMiddleware, inAttendanceTracker);
router.get("/in-complete", protect, cacheMiddleware, inCompleteTracker);
router.get("/attended", protect, cacheMiddleware, attendedTracker);
router.put("/update/:id", protect, restrict(["admin", "engineer", "superadmin", "maintenance"]), updateWorkOrder);
router.delete("/:id", protect, restrict(["admin", "superadmin"]), deleteWorkOrder);

module.exports = router;