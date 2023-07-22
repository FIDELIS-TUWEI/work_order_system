const express = require('express');
const router = express.Router();
const { createWorkOrder } = require('../controllers/workOrderController');


router.post("/create/work", createWorkOrder);

module.exports = router;