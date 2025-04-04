const QuestionCount = require("../models/questionCount");

/**
 * @method updateUserPassword
 * @param {string} username
 * @return {Object<QuestionCount>}
 */
const createNewCount = async (username) => {
  const count = await QuestionCount.findOne({ username });

  if (!count) {
    const newCount = await QuestionCount.create({ username, count: 0 });
    return newCount;
  }

  const twentyFourHoursInMins = 24 * 60 * 60 * 1000;

  if (+new Date() - +count.updatedAt >= twentyFourHoursInMins) {
    const updateCount = await QuestionCount.findOneAndUpdate({
      username,
      count: 0,
    });
    return updateCount;
  }
};

/**
 * Updates the count for a given user.
 * If the count is 0, it increments the count by 1 and returns the updated count.
 * If the count is not 0, it returns the current count.
 *
 * @param {string} username - The username of the user.
 * @returns {Promise<number|null>} - A promise that resolves to the updated count if the count is 0, or the current count if the count is not 0. Returns null if no count is found for the given username.
 */
const updateCount = async (username) => {
  const count = await QuestionCount.findOne({ username });

  if (count && count.count === 0) {
    const newCount = await QuestionCount.findOneAndUpdate({
      username,
      count: 1,
    });
    return newCount;
  }

  return count;
};

module.exports = { createNewCount, updateCount };
