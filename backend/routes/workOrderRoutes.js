const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getAllWorkOrders, getSingleWorkOrder, deleteWorkOrder } = require('../controllers/workOrderController');


router.post("/create/work", createWorkOrder);
router.get("/getall/work", getAllWorkOrders);
router.get("/single/work/:id", getSingleWorkOrder);
router.put("/update/work/:id", updateWorkOrder);
router.delete("/delete/work/:id", deleteWorkOrder);

module.exports = router;