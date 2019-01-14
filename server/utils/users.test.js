const expect = require('expect');
const { Users } = require('./users');

describe('Users Class', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      { id: '1', name: 'mike', room: 'test' },
      { id: '2', name: 'jen', room: 'test2' },
      { id: '3', name: 'julie', room: 'test' }
    ];
  });
  it('should add a new user', () => {
    let users = new Users();
    let user = { id: 123, name: 'kevin', room: 'room' };
    let res = users.addUser(user.id, user.name, user.room);

    expect(res).toBe(users.users[0]);
  });
  it('should return names for the "test" room', () => {
    let userList = users.getUserList('test');
    expect(userList).toEqual(['mike', 'julie']);
  });
  it('should return names for the "test2" room', () => {
    let userList = users.getUserList('test2');
    expect(userList).toEqual(['jen']);
  });
  it('should remove a user', () => {
    let user = users.removeUser('1');
    expect(user.name).toBe('mike');
    expect(users.users.length).toBe(2);
  });
  it('should not remove a user', () => {
    let user = users.removeUser('0');
    expect(user).toBe(undefined);
    expect(users.users.length).toBe(3);
  });
  it('should find a user', () => {
    let user = users.getUser('1');
    expect(user.name).toBe('mike');
  });
  it('should not find a user', () => {
    let user = users.getUser('0');
    expect(user).toBe(undefined);
  });
});
