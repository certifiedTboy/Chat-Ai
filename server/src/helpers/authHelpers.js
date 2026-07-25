const jwt = require("jsonwebtoken");
const envVariable = require("../config/index");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, envVariable.ACCESS_TOKEN_SECRET, {
    expiresIn: envVariable.ACCESS_TOKEN_EXPIRES_IN,
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, envVariable.ACCESS_TOKEN_SECRET);
};

module.exports = { generateAccessToken, verifyAccessToken };
