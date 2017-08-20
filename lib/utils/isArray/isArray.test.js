/* @flow */
/**
 * isArray.test.js
 * Written by: Connor Taylor
 */
const isArray = require('./isArray');

describe('isArray', () => {
  it('returns true when array', () => {
    expect(isArray([])).toBe(true);
  });

  it('returns false when not an array', () => {
    expect(isArray(1)).toBe(false);
    expect(isArray('')).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray(() => {})).toBe(false);
    expect(isArray(true)).toBe(false);
  });
});
