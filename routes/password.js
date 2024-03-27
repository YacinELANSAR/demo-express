const express = require("express");
const { getForgotPasswordView, sendForgotPasswordLink, getResetPasswordView, ResetPassword } = require("../controllers/passwordController"); // Corrected import
const router = express.Router();

router.route("/forgot-password").get(getForgotPasswordView).post(sendForgotPasswordLink);
router.route("/reset-password/:userId/:token").get(getResetPasswordView).post(ResetPassword);
module.exports = router;
