const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getAllWorkOrders, getSingleWorkOrder, deleteWorkOrder } = require('../controllers/workOrderController');
const { protect, isAdmin } = require('../middleware/authMiddleware');


router.post("/create/work", protect, createWorkOrder);
router.get("/getall/work", protect, getAllWorkOrders);
router.get("/single/work/:id", protect, isAdmin, getSingleWorkOrder);
router.put("/update/work/:id", protect, isAdmin, updateWorkOrder);
router.delete("/delete/work/:id", protect, isAdmin, deleteWorkOrder);

module.exports = router;