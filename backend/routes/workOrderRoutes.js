const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getAllWorkOrders, getSingleWorkOrder, deleteWorkOrder, pendingWorkOrder, completedWorkOrder } = require('../controllers/workOrderController');
const { protect,  restrict} = require('../middleware/authMiddleware');


router.post("/create/work", protect, restrict(["admin", "hod", "user", "supervisor", "superadmin"]), createWorkOrder);
router.get("/getall/work", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), getAllWorkOrders);
router.get("/work/complete", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), completedWorkOrder)
router.get("/single/work/:id", protect, restrict(["admin", "supervisor", "superadmin"]), getSingleWorkOrder);
router.get("/pending/work", protect, restrict(["admin", "hod", "supervisor", "superadmin"]), pendingWorkOrder);
router.put("/update/work/:id", protect, restrict(["admin", "supervisor", "superadmin"]), updateWorkOrder);
router.delete("/delete/work/:id", protect, restrict(["admin"]), deleteWorkOrder);

module.exports = router;