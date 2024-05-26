const express = require('express');
const router = express.Router();
const { createDesignation, getDesignations, deleteDesignation, queryDesignations } = require('../controllers/designation.controller');
const { protect, restrict, cacheMiddleware } = require('../middleware/authMiddleware');

router.post("/new/designation", protect, restrict(["admin", "superadmin"]), createDesignation);
router.get("/all", protect, restrict(["admin", "superadmin"]), cacheMiddleware, getDesignations);
router.get("/query", protect, restrict(["admin", "superadmin"]), cacheMiddleware, queryDesignations);
router.delete("/designation/:id", protect, restrict(["admin", "superadmin"]), deleteDesignation);

module.exports = router;