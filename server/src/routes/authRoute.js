const express = require("express");
const {
  userLoginWithGoogle,
  getCurrentUser,
  logOutUser,
  userLoginWithGithub,
} = require("../controllers/authControllers");
const Authenticate = require("../middlewares/Authenticate");
const router = express.Router();

router.post("/google/login", userLoginWithGoogle);
router.post("/github/login", userLoginWithGithub);
router.get("/me", Authenticate, getCurrentUser);
router.post("/logout", Authenticate, logOutUser);

module.exports = router;
