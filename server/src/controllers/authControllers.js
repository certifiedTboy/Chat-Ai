const {
  authenticateWithGoogle,
  getCurrentUserSession,
} = require("../services/authServices");

const { deleteSession } = require("../services/sessionService");

const userLoginWithGoogle = async (req, res) => {
  try {
    const { authToken } = req.body;

    const authenticatedUser = await authenticateWithGoogle(authToken);

    if (authenticatedUser) {
      const jwtTokenOptions = {
        expires: authenticatedUser.expireAt,
        maxAge: authenticatedUser.expireAt,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      res
        .cookie("authToken", authenticatedUser.authToken, jwtTokenOptions)
        .json({ message: "user login success", authenticatedUser });
    } else {
      res.status(400).json({ error: "user authentication failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

const getUserSession = async (req, res) => {
  try {
    const { email } = req.user;

    const { authToken } = req.cookies;

    if (email) {
      const currentSession = await getCurrentUserSession(email);
      if (!currentSession) {
        return res.status(400).json({ error: "session does not exist" });
      }

      return res.status(200).json({ message: "success", currentSession });
    } else {
      const sessionDeleted = await deleteSession(authToken);

      if (sessionDeleted) {
        const jwtTokenOptions = {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        };
        return res
          .clearCookie("authToken", jwtTokenOptions)
          .json({ error: "invalid token or token expired" });
      }
    }
  } catch (error) {
    await deleteSession(authToken);
    res.status(500).json({ error: "something went wrong" });
  }
};

const logOutUser = async (req, res) => {
  try {
    const { authToken } = req.cookies;

    const deletedSession = await deleteSession(authToken);

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

module.exports = { userLoginWithGoogle, getUserSession, logOutUser };
