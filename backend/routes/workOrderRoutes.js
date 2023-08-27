const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getAllWorkOrders, getSingleWorkOrder, deleteWorkOrder } = require('../controllers/workOrderController');
const { protect,  restrict} = require('../middleware/authMiddleware');


router.post("/create/work", protect, restrict(["admin", "hod", "user", "supervisor", "superadmin"]), createWorkOrder);
router.get("/getall/work", protect, restrict(["admin", "hod", "supervisor", "superadmin", "reviewer"]), getAllWorkOrders);
router.get("/single/work/:id", protect, restrict(["admin", "supervisor", "superadmin", "hod", "reviewer"]), getSingleWorkOrder);
router.put("/update/work/:id", protect, restrict(["admin", "supervisor", "superadmin", "hod", "reviewer"]), updateWorkOrder);
router.delete("/delete/work/:id", protect, restrict(["admin"]), deleteWorkOrder);
router.post("/move-complete/work/:id", protect, restrict(["superadmin", "admin"]));

module.exports = router;