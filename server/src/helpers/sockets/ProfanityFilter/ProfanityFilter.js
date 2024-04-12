const axios = require("axios");
const envVariable = require("../../../config/index");

const { RAPID_API_KEY, RAPID_API_HOST, FILTER_URL } = envVariable;

const encodedParams = new URLSearchParams();

const profanityFilter = async (word) => {
  encodedParams.set("content", `${word}`);
  encodedParams.set("censor-character", "*");

  const options = {
    method: "POST",
    url: FILTER_URL,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": RAPID_API_HOST,
    },
    data: encodedParams,
  };

  const response = await axios.request(options);

  const data = await response.data;
  const isBad = Object.values(data)[1];

  return isBad;
};

module.exports = { profanityFilter };
