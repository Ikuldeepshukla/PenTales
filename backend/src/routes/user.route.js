const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  forgotpassword,
  resetPassword,
  getIsLoggedInUserDetails,
  updatePassword,
  updateUserDetails,
} = require("../controllers/user.controller");
const { isLoggedIn } = require("../middlewares/user");

router.route("/signup").post(signup);
router.route("/login").post(signin);
router.route("/logout").get(signout);
router.route("/forgotpassword").post(forgotpassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/userdashboard").get(isLoggedIn, getIsLoggedInUserDetails);
router.route("/password/update").post(isLoggedIn, updatePassword);
router.route("/userdashboard/update").post(isLoggedIn, updateUserDetails);

module.exports = router;
