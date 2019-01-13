let expect = require('expect');
let { generateMessage, generateLocationMessage } = require('./utils/message');

describe('generateMessage()', () => {
  it('should generate correct message object', () => {
    let testObj = generateMessage('test', 'test message');
    expect(testObj.from).toBe('test');
    expect(testObj.text).toBe('test message');
    expect(typeof testObj.createdAt).toBe('number');
  });
});

describe('generateLocationMessage()', () => {
  it('should generate correct location message object', () => {
    let testObj = generateLocationMessage('test', {
      longitude: 1,
      latitude: 1
    });
    expect(testObj.from).toBe('test');
    expect(testObj.Url).toBe('https://www.google.com/maps?q=1,1');
    expect(typeof testObj.createdAt).toBe('number');
  });
});
