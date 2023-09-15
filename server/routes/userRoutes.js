const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  forgotpassword,
  resetPassword,
} = require("../controllers/usersController");
const {
  getUserDetails,
  updateUserDetails,
  updateUserProfile,
  updateUserPassword,
  deleteUser
} = require("../controllers/usersStuff");
const { isUserAuthenticated, authorizedRoles } = require("../middleware/auth");
const { getAlluserDetails } = require("../controllers/adminStuff");
const { createProductReview, deleteReview, getProductReview } = require("../controllers/productsStuff");
const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/forgotPassword").post(forgotpassword);
router.route("/resetPassword/:token").put(resetPassword);

router.route("/me").get(isUserAuthenticated, getUserDetails);
router.route("/updateDetails").post(isUserAuthenticated, updateUserDetails);
router.route("/updateProfile").post(isUserAuthenticated, updateUserProfile);
router.route("/updatePassword").post(isUserAuthenticated, updateUserPassword);
router.route("/deleteUser").post(isUserAuthenticated,deleteUser);

router
  .route("/getAllUserdetails")
  .get(isUserAuthenticated, authorizedRoles("admin"), getAlluserDetails);

router.route("/review").post(isUserAuthenticated, createProductReview).get(getProductReview).put(isUserAuthenticated,deleteReview);

module.exports = router;
