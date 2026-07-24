const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const envVariable = require("../config/index");

const verifyGoogleToken = async (token) => {
  const client = new OAuth2Client(envVariable.GOOGLE_OAUTH_CLIENT_SECRET);

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: envVariable.GOOGLE_OAUTH_CLIENT_ID,
  });

  const payload = result.getPayload();

  console.log(payload);

  return {};

  // return { given_name, family_name, email, picture, exp };
};

const generateAccessToken = (payload) => {
  return jwt.sign(payload, envVariable.ACCESS_TOKEN_SECRET, {
    expiresIn: envVariable.ACCESS_TOKEN_EXPIRES_IN,
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, envVariable.ACCESS_TOKEN_SECRET);
};

module.exports = { verifyGoogleToken, generateAccessToken, verifyAccessToken };
