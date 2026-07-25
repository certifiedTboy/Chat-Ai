const { verifyAccessToken } = require("../helpers/authHelpers");
const { HttpException } = require("../config/exception");

const Authenticate = async (req, res, next) => {
  try {
    const { authToken } = req.cookies;
    if (!authToken) {
      throw new HttpException(401, "jwt expired");
    }
    const authPayload = await verifyAccessToken(authToken);
    if (!authPayload) {
      throw new HttpException(401, "jwt expired");
    }
    req.user = authPayload;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Authenticate;
