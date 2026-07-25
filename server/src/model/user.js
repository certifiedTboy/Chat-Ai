const { HttpException } = require("../config/exception");

class UserModel {
  constructor(name, email, avatar, username) {
    this.username = username;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
  }
}

class User {
  constructor() {
    this.users = [];
    this.chatUsers = [];
  }

  createUser(name, email, avatar, username) {
    const foundUser = this.find(email);

    if (foundUser.userExist) {
      throw new HttpException(409, "User with email already exists");
    }
    const user = new UserModel(name, email, avatar, username);
    this.users.push(user);
    return user;
  }

  deleteUser(email) {
    const index = this.users.findIndex((user) => user.email === email);
    if (index >= 0) {
      return this.users.splice(index, 1);
    }
  }

  find(email) {
    const user = this.users.find((user) => user.email === email);
    if (user) {
      return { userExist: true, user };
    } else {
      return false;
    }
  }

  addUserToChat(userData) {
    const userIndex = this.chatUsers.findIndex(
      (user) => user.email === userData.email,
    );

    if (userIndex == -1) {
      this.chatUsers.push(userData);
    } else {
      this.chatUsers[userIndex] = userData;
    }
  }

  removeUserFromChar(userData) {
    const index = this.users.findIndex((user) => user.email === userData.email);
    const chatUserIndex = this.chatUsers.findIndex(
      (user) => user.email === userData.email,
    );
    if (index >= 0) {
      this.users.splice(index, 1);
    }
    if (chatUserIndex >= 0) {
      this.chatUsers.splice(chatUserIndex, 1);
    }
  }

  getCurrentChatUser(email) {
    const user = this.chatUsers.find((user) => user.email === email);
    if (user) return user;
  }
}

const user = new User();
module.exports = user;
