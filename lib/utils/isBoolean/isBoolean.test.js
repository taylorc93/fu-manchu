const isBoolean = require(`./isBoolean`);

describe(`isBoolean`, () => {
  it(`returns true when boolean`, () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  it(`returns false when not a boolean`, () => {
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean(``)).toBe(false);
    expect(isBoolean({})).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean(() => {})).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean(null)).toBe(false);
  });
});
