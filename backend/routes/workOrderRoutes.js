const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getAllWorkOrders } = require('../controllers/workOrderController');


router.post("/create/work", createWorkOrder);
router.get("/getall/work", getAllWorkOrders);
router.put("/update/work/:id", updateWorkOrder);

module.exports = router;