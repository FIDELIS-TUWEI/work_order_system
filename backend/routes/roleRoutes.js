const express = require("express");
const router = express.Router();
const { assignRole, updateRole, getAllRoles } = require("../controllers/role");

router.post("/role", assignRole);
router.get("getAll", getAllRoles);
router.put("/update/:id", updateRole);

module.exports = router;