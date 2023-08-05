const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getAllWorkOrders, getSingleWorkOrder, deleteWorkOrder, pendingWorkOrder, completeWork } = require('../controllers/workOrderController');
const { protect,  restrict} = require('../middleware/authMiddleware');


router.post("/create/work", protect, restrict(["admin", "hod", "user", "supervisor"]), createWorkOrder);
router.get("/getall/work", protect, restrict(["admin", "hod", "supervisor"]), getAllWorkOrders);
router.get("/single/work/:id", protect, restrict(["admin", "supervisor"]), getSingleWorkOrder);
router.get("/pending/work", protect, restrict(["admin", "hod", "supervisor"]), pendingWorkOrder);
router.get("/completed/work", protect, restrict(["admin", "hod", "supervisor"]), completeWork);
router.put("/update/work/:id", protect, restrict(["admin", "supervisor"]), updateWorkOrder);
router.delete("/delete/work/:id", protect, restrict(["admin"]), deleteWorkOrder);

module.exports = router;