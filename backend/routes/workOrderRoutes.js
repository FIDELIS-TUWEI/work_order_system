const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getAllWorkOrders, getSingleWorkOrder, deleteWorkOrder } = require('../controllers/workOrderController');
const { protect,  restrict} = require('../middleware/authMiddleware');


router.post("/create/work", protect, restrict(["admin", "hod", "user", "supervisor", "superadmin", "reviewer", "engineer"]), createWorkOrder);
router.get("/getall/work", protect, restrict(["admin", "hod", "supervisor", "superadmin", "reviewer", "engineer"]), getAllWorkOrders);
router.get("/single/work/:id", protect, restrict(["admin", "supervisor", "superadmin", "hod", "reviewer", "engineer"]), getSingleWorkOrder);
router.put("/update/work/:id", protect, restrict(["admin", "supervisor", "superadmin", "hod", "reviewer", "engineer"]), updateWorkOrder);
router.delete("/delete/work/:id", protect, restrict(["admin"]), deleteWorkOrder);

module.exports = router;