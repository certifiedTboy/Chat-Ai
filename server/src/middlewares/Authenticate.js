const verifyToken = require("../helpers/authHelpers");

const Authenticate = async (req, res, next) => {
  try {
    const { authToken } = req.cookies;
    const authPayload = await verifyToken(authToken);
    req.user = authPayload;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Authenticate;
