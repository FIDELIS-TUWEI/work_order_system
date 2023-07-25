const express = require('express');
const router = express.Router();
const { createWorkOrder, updateWorkOrder, getAllWorkOrders, getSingleWorkOrder, deleteWorkOrder } = require('../controllers/workOrderController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');


router.post("/create/work", isAuthenticated, createWorkOrder);
router.get("/getall/work", isAuthenticated, getAllWorkOrders);
router.get("/single/work/:id", isAuthenticated, isAdmin, getSingleWorkOrder);
router.put("/update/work/:id", isAuthenticated, isAdmin, updateWorkOrder);
router.delete("/delete/work/:id", isAuthenticated, isAdmin, deleteWorkOrder);

module.exports = router;