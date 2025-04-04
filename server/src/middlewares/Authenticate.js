const verifyToken = require("../helpers/authHelpers");

const Authenticate = async (req, res, next) => {
  try {
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.status(403).json({ error: "login failed" });
    }
    const authPayload = await verifyToken(authToken);
    if (!authPayload) {
      return res.status(403).json({ error: "login failed" });
    }
    req.user = { email: "etosin70@gmail.com" };
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "login failed" });
  }
};

module.exports = Authenticate;
