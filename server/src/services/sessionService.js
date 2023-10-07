const UserSession = require("../models/userSession");

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

const checkSessionExistByEmail = async (email) => {
  const userSession = await UserSession.findOne({ email });

  return userSession;
};

const deleteSession = async (authToken) => {
  const deletedSession = await UserSession.findOneAndRemove({ authToken });

  return deletedSession;
};

module.exports = {
  createOrUpdateSession,
  checkSessionExistByEmail,
  deleteSession,
};
