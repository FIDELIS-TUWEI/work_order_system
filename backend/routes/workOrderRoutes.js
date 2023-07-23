const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder } = require('../controllers/workOrderController');


router.post("/create/work", createWorkOrder);
router.put("/update/work/:id", updateWorkOrder);

module.exports = router;