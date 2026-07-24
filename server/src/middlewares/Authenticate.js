const { verifyAccessToken } = require("../helpers/authHelpers");

const Authenticate = async (req, res, next) => {
  try {
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.status(403).json({ error: "Unathorized" });
    }
    const authPayload = await verifyAccessToken(authToken);
    if (!authPayload) {
      return res.status(401).json({ error: "jwt expired" });
    }
    req.user = { email: "etosin70@gmail.com" };
    next();
  } catch (error) {
    return res.status(403).json({ error: "Unathorized" });
  }
};

module.exports = Authenticate;
