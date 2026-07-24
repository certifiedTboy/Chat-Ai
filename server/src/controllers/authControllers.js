const {
  authenticateWithGoogle,
  checkUserExist,
  deleteCurrentUser,
  authenticateWithGithub,
} = require("../services/authServices");

/**
 * @method userLoginWithGoogle
 * @param {Request}req
 * @param {Response}res
 * @param {NextFunction}next
 * @return {Promise}
 */
const userLoginWithGoogle = async (req, res) => {
  try {
    const { authToken } = req.body;

    const authenticatedUser = await authenticateWithGoogle(authToken);

    if (authenticatedUser) {
      const cookieOptions = {
        expires: authenticatedUser.expireAt,
        maxAge: authenticatedUser.expireAt,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      res
        .cookie("authToken", authenticatedUser.authToken, cookieOptions)
        .json({ message: "user login success", ...authenticatedUser });
    } else {
      res.status(400).json({ error: "user authentication failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }
};

const userLoginWithGithub = async (req, res) => {
  try {
    const { code } = req.body;

    const authenticatedUser = await authenticateWithGithub(code);

    if (authenticatedUser) {
      const cookieOptions = {
        expires: authenticatedUser.expireAt,
        maxAge: authenticatedUser.expireAt,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      res
        .cookie("authToken", authenticatedUser.authToken, cookieOptions)
        .json({ message: "user login success", ...authenticatedUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }
};

/**
 * @method getUserSession
 * @param {Request}req
 * @param {Response}res
 * @param {NextFunction}next
 * @return {Promise}
 */
const getCurrentUser = async (req, res) => {
  try {
    const { email } = req.user;

    const currentUser = checkUserExist(email);

    return res.status(200).json({ message: "success", currentUser });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

/**
 * @method logOutUser
 * @param {Request}req
 * @param {Response}res
 * @param {NextFunction}next
 * @return {Promise}
 */
const logOutUser = async (req, res) => {
  try {
    const { email } = req.user;
    const deletedSession = await deleteCurrentUser(email);

    if (deletedSession) {
      const jwtTokenOptions = {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      return res
        .clearCookie("authToken", jwtTokenOptions)
        .json({ message: "logout successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

module.exports = {
  userLoginWithGoogle,
  getCurrentUser,
  logOutUser,
  userLoginWithGithub,
};
