const _ = require('lodash');

[{
  id: '/#12poiaflkskfge',
  name: 'Andrew',
  room: 'The Office fans'
}]

class Users {

  constructor() {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    return _.remove(this.users, (x) => x.id === id)[0];
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList(room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArr = users.map((user) => user.name);
    return namesArr;
  }

}

module.exports = {Users};

// class Person {
//
//   constructor(name, age) {
//       this.name = name;
//       this.age = age;
//   }
//
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }