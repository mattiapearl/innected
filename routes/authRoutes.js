const { Router } = require("express");
const authController = require("../controllers/authController");
const { inverseAuth } = require("../middleware/authMiddleware");

const router = Router();

router.get("/signup", inverseAuth, authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", inverseAuth, authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);

module.exports = router;
