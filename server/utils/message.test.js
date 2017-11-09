const expect = require('expect');

const {generateMessage} = require('./message');
const {generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'test@test.com';
    const latitude = '28.385233';
    const longitude = '-81.566062';
    const msg = generateLocationMessage(from, latitude, longitude);
    expect(msg.from).toBe(from);
    expect(msg.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
    expect(typeof msg.createdAt).toBe('number');
  });
});


