const express = require("express");
const {
  userLoginWithGoogle,
  getCurrentUser,
  logOutUser,
  userLoginWithGithub,
} = require("../controllers/authControllers");
const Authenticate = require("../middlewares/Authenticate");
const {
  checkValidationResult,
  signupWithGoogleValidationRules,
  signupWithGithubValidationRules,
} = require("../middlewares/validators");
const router = express.Router();

router.post(
  "/google/login",
  signupWithGoogleValidationRules,
  checkValidationResult,
  userLoginWithGoogle,
);
router.post(
  "/github/login",
  signupWithGithubValidationRules,
  checkValidationResult,
  userLoginWithGithub,
);
router.get("/me", Authenticate, getCurrentUser);
router.post("/logout", Authenticate, logOutUser);

module.exports = router;
