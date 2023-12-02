const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getAllWorkOrders, getSingleWorkOrder, deleteWorkOrder, queryAllWork } = require('../controllers/workOrderController');
const { protect,  restrict, setReviewedBy, cacheMiddleware} = require('../middleware/authMiddleware');


router.post("/create/work", protect, restrict(["admin", "hod", "user", "supervisor", "superadmin", "reviewer", "engineer"]), createWorkOrder);
router.get("/getall/work", protect, restrict(["admin", "hod", "supervisor", "superadmin", "reviewer", "engineer"]), cacheMiddleware, getAllWorkOrders);
router.get("/query/all/work", protect, restrict(["admin", "hod", "supervisor", "superadmin", "reviewer", "engineer"]), cacheMiddleware, queryAllWork);
router.get("/single/work/:id", protect, restrict(["admin", "supervisor", "superadmin", "hod", "reviewer", "engineer"]), cacheMiddleware, getSingleWorkOrder);
router.put("/update/work/:id", protect, setReviewedBy, restrict(["admin", "supervisor", "superadmin", "reviewer", "engineer", "hod"]), updateWorkOrder);
router.delete("/delete/work/:id", protect, restrict(["admin", "superadmin"]), deleteWorkOrder);

module.exports = router;