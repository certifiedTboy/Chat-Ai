const messageFormat = (sender, text, type) => {
  return {
    sender,
    text,
    type,
  };
};

module.exports = { messageFormat };
