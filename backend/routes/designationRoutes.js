const express = require('express');
const router = express.Router();
const { createDesignation, getAllDesignations, deleteDesignation, queryAllDesignations } = require('../controllers/designationController');
const { protect, restrict } = require('../middleware/authMiddleware');

router.post("/new/designation", protect, restrict(["admin", "superadmin"]), createDesignation);
router.get("/all-designations", protect, restrict(["admin", "superadmin"]), getAllDesignations);
router.get("/query/all-designations", protect, restrict(["admin", "superadmin"]), queryAllDesignations);
router.delete("/delete/designation/:id", protect, restrict(["admin", "superadmin"]), deleteDesignation);

module.exports = router;