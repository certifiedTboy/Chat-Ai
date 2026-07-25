const axios = require("axios");
const {
  verifyGoogleToken,
  generateAccessToken,
} = require("../helpers/authHelpers");
const envVariable = require("../config/index");
const user = require("../model/user");

/**
 * @method authenticateWithGoogle
 * @param {string} token
 * @return {object<UserSession>}
 */
const authenticateWithGoogle = async (token) => {
  const response = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response && response?.data) {
    const userData = {
      name: response?.data?.name,
      email: response?.data?.email,
      avatar: response?.data?.picture,
      username: response?.data?.email.split("@")[0],
    };

    const accessToken = generateAccessToken(userData);

    user.createUser(
      userData.name,
      userData.email,
      userData.avatar,
      userData.email.split("@")[0],
    );

    return { userData, authToken: accessToken };
  } else {
    return false;
  }
};

const authenticateWithGithub = async (code) => {
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: envVariable.GITHUB_OAUTH_CLIENT_ID,
      client_secret: envVariable.GITHUB_OAUTH_SECRET,
      code,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  const headers = {
    Authorization: `Bearer ${response?.data?.access_token}`,
    Accept: "application/vnd.github+json",
  };

  const [{ data: profile }, { data: emails }] = await Promise.all([
    axios.get("https://api.github.com/user", { headers }),
    axios.get("https://api.github.com/user/emails", { headers }),
  ]);

  const primaryEmail =
    emails.find((email) => email.primary && email.verified)?.email ??
    emails.find((email) => email.verified)?.email ??
    null;

  const userData = {
    name: profile.name,
    avatar: profile.avatar_url,
    email: primaryEmail,
    username: primaryEmail.split("@")[0],
  };

  const accessToken = generateAccessToken(userData);

  user.createUser(
    userData.name,
    userData.email,
    userData.avatar,
    userData.email.split("@")[0],
  );

  return { userData, authToken: accessToken };
};

const checkUserExist = (email) => {
  const foundUser = user.find(email);

  if (foundUser.userExist) {
    return foundUser.user;
  } else {
    throw new Error("User does not exist");
  }
};

const deleteCurrentUser = (email) => {
  const deletedUser = user.deleteUser(email);

  if (deletedUser) {
    return true;
  }
};

module.exports = {
  authenticateWithGoogle,
  checkUserExist,
  deleteCurrentUser,
  authenticateWithGithub,
};
