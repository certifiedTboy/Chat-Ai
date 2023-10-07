const UserSession = require("../models/userSession");

/**
 * @method createOrUpdateSession
 * @param {object} sessionData
 * @return {object<UserSession>}
 */
const createOrUpdateSession = async (sessionData) => {
  let sessionExist;

  sessionExist = await checkSessionExistByEmail(sessionData.email);

  if (sessionExist) {
    return sessionExist;
  } else {
    sessionExist = await UserSession.create(sessionData);

    return sessionExist;
  }
};

/**
 * @method checkSessionExistByEmail
 * @param {string} email
 * @return {Object<UserSession>}
 */
const checkSessionExistByEmail = async (email) => {
  const userSession = await UserSession.findOne({ email });

  return userSession;
};

/**
 * @method deleteSession
 * @param {string} authToken
 * @return {Promise}
 */
const deleteSession = async (authToken) => {
  const deletedSession = await UserSession.findOneAndRemove({ authToken });

  return deletedSession;
};

module.exports = {
  createOrUpdateSession,
  checkSessionExistByEmail,
  deleteSession,
};
