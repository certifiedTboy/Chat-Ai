const verifyToken = require("../helpers/authHelpers");
const {
  createOrUpdateSession,
  checkSessionExistByEmail,
} = require("./sessionService");

const authenticateWithGoogle = async (token) => {
  const decodedToken = await decodeURIComponent(token);
  const { given_name, family_name, email, picture, exp } = await verifyToken(
    decodedToken
  );

  if (given_name || family_name) {
    const userData = {
      name: `${family_name} ${given_name}`,
      email,
      picture,
      username: email.split("@")[0],
      authToken: token,
      expireAt: new Date() + 1000 * 60 * 60,
    };

    const newUserSession = await createOrUpdateSession(userData);
    if (newUserSession) {
      return newUserSession;
    }
  }
};

const getCurrentUserSession = async (email) => {
  const userSession = await checkSessionExistByEmail(email);

  return userSession;
};

module.exports = { authenticateWithGoogle, getCurrentUserSession };
