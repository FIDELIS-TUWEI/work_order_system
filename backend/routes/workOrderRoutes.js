const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getAllWorkOrders, getSingleWorkOrder, deleteWorkOrder, queryAllWork } = require('../controllers/workOrderController');
const { protect, restrict, cacheMiddleware, setVerifiedBy} = require('../middleware/authMiddleware');


router.post("/create/work", protect, restrict(["admin", "hod", "user", "supervisor", "superadmin", "reviewer", "engineer", "maintenance"]), createWorkOrder);
router.get("/getall/work", protect, restrict(["admin", "hod", "supervisor", "superadmin", "reviewer", "engineer", "maintenance"]), cacheMiddleware, getAllWorkOrders);
router.get("/query/all/work", protect, restrict(["admin", "hod", "supervisor", "superadmin", "reviewer", "engineer", "maintenance"]), cacheMiddleware, queryAllWork);
router.get("/single/work/:id", protect, restrict(["admin", "supervisor", "superadmin", "hod", "reviewer", "engineer", "maintenance"]), cacheMiddleware, getSingleWorkOrder);
router.put("/update/work/:id", protect, restrict(["admin", "supervisor", "superadmin", "reviewer", "engineer", "hod", "maintenance"]), setVerifiedBy, updateWorkOrder);
router.delete("/delete/work/:id", protect, restrict(["admin", "superadmin"]), deleteWorkOrder);

module.exports = router;