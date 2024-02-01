const express = require('express');
const router = express.Router();
const { createDesignation, getAllDesignations, deleteDesignation, queryAllDesignations } = require('../controllers/designationController');
const { restrict, cacheMiddleware } = require('../middleware/authMiddleware');

router.post("/new/designation", restrict(["admin", "superadmin"]), createDesignation);
router.get("/all-designations", restrict(["admin", "superadmin"]), cacheMiddleware, getAllDesignations);
router.get("/query/all-designations", restrict(["admin", "superadmin"]), cacheMiddleware, queryAllDesignations);
router.delete("/delete/designation/:id", restrict(["admin", "superadmin"]), deleteDesignation);

module.exports = router;