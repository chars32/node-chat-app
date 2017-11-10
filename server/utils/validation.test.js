const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const inputVal = 123;
    const output = isRealString(inputVal);
    expect(output).toBe(false);
  });

  it('should reject string values with only spaces', () => {
    const inputVal = '         ';
    const output = isRealString(inputVal);
    expect(output).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    const inputVal = 'ThisIsAtest';
    const output = isRealString(inputVal);
    expect(output).toBe(true);
  });
});