const express = require("express");
const { protect, cacheMiddleware, isAdmin, restrict } = require("../middleware/authMiddleware");
const { createService, allServiceTypes, queryServices, updateService, deleteService } = require("../controllers/serviceController");
const router = express.Router();


router.post("/new/service", protect, restrict(["admin", "superadmin"]), createService);
router.get("/all/services", protect, cacheMiddleware, allServiceTypes);
router.get("/query/services", protect, restrict(["admin", "superadmin", "hod", "maintenance", "engineer", "user", "supervisor"]), cacheMiddleware, queryServices);
router.put("/edit/service/:id", protect, restrict(["admin", "superadmin"]), updateService);
router.delete("/delete/service/:id", protect, isAdmin, deleteService);

module.exports = router;