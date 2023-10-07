const express = require("express");
const {
  userLoginWithGoogle,
  getUserSession,
  logOutUser,
} = require("../controllers/authControllers");
const Authenticate = require("../middlewares/Authenticate");
const router = express.Router();

router.post("/login", userLoginWithGoogle);
router.get("/me", Authenticate, getUserSession);
router.post("/logout", Authenticate, logOutUser);

module.exports = router;
