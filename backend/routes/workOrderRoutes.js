const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getAllWorkOrders, getSingleWorkOrder, deleteWorkOrder, queryAllWork } = require('../controllers/workOrderController');
const { restrict, cacheMiddleware, setVerifiedBy} = require('../middleware/authMiddleware');


router.post("/create/work", restrict(["admin", "hod", "user", "supervisor", "superadmin", "reviewer", "engineer"]), createWorkOrder);
router.get("/getall/work", restrict(["admin", "hod", "supervisor", "superadmin", "reviewer", "engineer"]), cacheMiddleware, getAllWorkOrders);
router.get("/query/all/work", restrict(["admin", "hod", "supervisor", "superadmin", "reviewer", "engineer"]), cacheMiddleware, queryAllWork);
router.get("/single/work/:id", restrict(["admin", "supervisor", "superadmin", "hod", "reviewer", "engineer"]), cacheMiddleware, getSingleWorkOrder);
router.put("/update/work/:id", restrict(["admin", "supervisor", "superadmin", "reviewer", "engineer", "hod"]), setVerifiedBy, updateWorkOrder);
router.delete("/delete/work/:id", restrict(["admin", "superadmin"]), deleteWorkOrder);

module.exports = router;