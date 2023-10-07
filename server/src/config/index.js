const dotenv = require("dotenv");

dotenv.config();

const { env } = process;

const envVariable = {
  PORT: env.PORT,
  GOOGLE_OAUTH_CLIENT_SECRET: env.GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_CLIENT_ID: env.GOOGLE_OAUTH_CLIENT_ID,
  DB_URL: env.DB_URL,
  OPEN_AI_KEY: env.OPEN_AI_KEY,
};

module.exports = envVariable;
