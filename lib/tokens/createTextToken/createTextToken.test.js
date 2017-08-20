const createTextToken = require('./createTextToken');
const { TEXT_TAG } = require('../../utils/constants');

describe('createTextToken', () => {
  it(`creates a token with the proper format`, () => {
    const input = `foobar`;

    expect(createTextToken(input, 2)).toEqual({
      type: TEXT_TAG,
      rawContents: `fo`,
      key: ``,
    });
  });
});
