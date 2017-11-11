const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }, {
      id: '4',
      name: 'Joanna',
      room: 'Unknown Course'
    }];

  });

  it('should add new user', () => {
    let users = new Users();
    const user = {
      id: '123',
      name: 'Andrew',
      room: 'The Office fans'
    };
    const res = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });

  it('should remove a user', () => {
    const expUser = users.users[3];
    var user = users.removeUser('4');
    expect(user).toEqual(expUser);
    expect(users.users.length).toEqual(3);
  });

  it('should not remove a user', () => {
    var user = users.removeUser('8');
    expect(user).toNotExist();
  });

  it('should find a user', () => {
    var user = users.getUser('1');
    expect(user).toEqual(users.users[0]);
  });

  it('should not find a user', () => {
    var user = users.getUser('x');
    expect(user).toNotExist();
  });

});