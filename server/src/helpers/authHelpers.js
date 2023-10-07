const { OAuth2Client } = require("google-auth-library");
const envVariable = require("../config/index");
const client = new OAuth2Client(envVariable.GOOGLE_OAUTH_CLIENT_SECRET);

const verifyToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: envVariable.GOOGLE_OAUTH_CLIENT_ID,
  });

  const { given_name, family_name, email, picture, exp } = ticket.getPayload();

  return { given_name, family_name, email, picture, exp };
};

module.exports = verifyToken;
