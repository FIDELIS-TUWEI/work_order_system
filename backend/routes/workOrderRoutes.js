const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getAllWorkOrders, getSingleWorkOrder, deleteWorkOrder, queryAllWork, filterWorkByCalendar } = require('../controllers/workOrderController');
const { protect,  restrict, setReviewedBy} = require('../middleware/authMiddleware');


router.post("/create/work", protect, restrict(["admin", "hod", "user", "supervisor", "superadmin", "reviewer", "engineer"]), createWorkOrder);
router.get("/getall/work", protect, restrict(["admin", "hod", "supervisor", "superadmin", "reviewer", "engineer"]), getAllWorkOrders);
router.get("/query/all/work", protect, restrict(["admin", "hod", "supervisor", "superadmin", "reviewer", "engineer"]), queryAllWork);
router.get("/single/work/:id", protect, restrict(["admin", "supervisor", "superadmin", "hod", "reviewer", "engineer"]), getSingleWorkOrder);
router.get("workorders/:dateFilter", protect, filterWorkByCalendar)
router.put("/update/work/:id", protect, setReviewedBy, restrict(["admin", "supervisor", "superadmin", "reviewer", "engineer"]), updateWorkOrder);
router.delete("/delete/work/:id", protect, restrict(["admin", "superadmin"]), deleteWorkOrder);

module.exports = router;