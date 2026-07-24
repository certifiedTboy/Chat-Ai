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
  }

  createUser(name, email, avatar, username) {
    const foundUser = this.find(email);

    if (foundUser.userExist) {
      throw new Error("User with email already exists");
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
}

const user = new User();
module.exports = user;
