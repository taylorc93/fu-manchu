const escapeRegExp = require('./escapeRegExp');

describe('escapeRegExp', () => {
  it('escapes all special characters', () => {
    const input = '.*+?^${}()|[\]\\';

    const output = escapeRegExp(input);
    
    // So many backslashes
    expect(output).toBe(`\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\`);
    expect(new RegExp(output)).toEqual(/\.\*\+\?\^\$\{\}\(\)\|\[\]\\/);
  });
});
