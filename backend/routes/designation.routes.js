const express = require('express');
const router = express.Router();
const { createDesignation, getDesignations, deleteDesignation, queryDesignations } = require('../controllers/designation.controller');
const { protect, restrict, cacheMiddleware } = require('../middleware/authMiddleware');

router.post("/new", protect, restrict(["admin", "superadmin"]), createDesignation);
router.get("/", protect, restrict(["admin", "superadmin"]), cacheMiddleware, getDesignations);
router.get("/query", protect, restrict(["admin", "superadmin"]), cacheMiddleware, queryDesignations);
router.delete("/:id", protect, restrict(["admin", "superadmin"]), deleteDesignation);

module.exports = router;