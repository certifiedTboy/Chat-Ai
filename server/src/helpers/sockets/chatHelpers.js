const users = [];

// Join user to chat
function userJoin(id, userData, room) {
  const user = { id, userData, room };
  users.push(user);
  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(username) {
  const index = users.findIndex((user) => user.userData.username === username);

  if (index >= 0) {
    return users.splice(index, 1);
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
