const messageFormat = (sender, message, userImage, type) => {
  return {
    sender,
    message,
    userImage,
    type,
  };
};

module.exports = messageFormat;
