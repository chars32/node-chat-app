const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'test@test.com';
    const text = 'Test message';
    const msg = generateMessage(from, text);
    expect(msg.from).toBe(from);
    expect(msg.text).toBe(text);
    expect(typeof msg.createdAt).toBe('number');
  });
});


