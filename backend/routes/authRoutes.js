const express = require("express");
const router = express.Router();
const { signupUser, login, logout, getUserInfo, changePassword } = require("../controllers/authController");
const { restrict } = require("../middleware/authMiddleware");

router.post("/register", restrict(["admin", "superadmin"]), signupUser);
router.post("/login",  login);
router.post("/logout", logout);
router.get("/userInfo", getUserInfo);
router.put("/update/password/:id", restrict(["admin", "superadmin"]), changePassword);

module.exports = router;