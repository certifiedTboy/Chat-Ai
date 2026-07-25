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
const userLoginWithGoogle = async (req, res, next) => {
  try {
    const { authToken } = req.body;

    const authenticatedUser = await authenticateWithGoogle(authToken);

    const cookieOptions = {
      expires: authenticatedUser.expireAt,
      maxAge: authenticatedUser.expireAt,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    return res
      .cookie("authToken", authenticatedUser.authToken, cookieOptions)
      .json({ message: "user login success", ...authenticatedUser.userData });
  } catch (error) {
    next(error);
  }
};

const userLoginWithGithub = async (req, res, next) => {
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

      return res
        .cookie("authToken", authenticatedUser.authToken, cookieOptions)
        .json({ message: "user login success", ...authenticatedUser.userData });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @method getUserSession
 * @param {Request}req
 * @param {Response}res
 * @param {NextFunction}next
 * @return {Promise}
 */
const getCurrentUser = async (req, res, next) => {
  try {
    const { email } = req.user;

    const currentUser = checkUserExist(email);

    return res.status(200).json({ message: "success", currentUser });
  } catch (error) {
    next(error);
  }
};

/**
 * @method logOutUser
 * @param {Request}req
 * @param {Response}res
 * @param {NextFunction}next
 * @return {Promise}
 */
const logOutUser = async (req, res, next) => {
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
    next(error);
  }
};

module.exports = {
  userLoginWithGoogle,
  getCurrentUser,
  logOutUser,
  userLoginWithGithub,
};
