let expect = require('expect');
let { generateMessage } = require('./utils/message');

describe('generateMessage()', () => {
  it('should generate correct message object', () => {
    let testObj = generateMessage('test', 'test message');
    expect(testObj.from).toBe('test');
    expect(testObj.text).toBe('test message');
    expect(typeof testObj.generatedAt).toBe('number');
  });
});
