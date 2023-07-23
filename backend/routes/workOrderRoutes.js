const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getAllWorkOrders, getSingleWorkOrder } = require('../controllers/workOrderController');


router.post("/create/work", createWorkOrder);
router.get("/getall/work", getAllWorkOrders);
router.get("/single/work/:id", getSingleWorkOrder);
router.put("/update/work/:id", updateWorkOrder);

module.exports = router;