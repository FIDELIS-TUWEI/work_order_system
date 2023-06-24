const express = require("express");
const router = express.Router();
const { assignRole, updateRole } = require("../controllers/role");

router.post("/role", assignRole);
router.put("/update/:id", updateRole);

module.exports = router;