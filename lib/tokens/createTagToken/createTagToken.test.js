const createTagToken = require('./createTagToken');
const constants = require('../../utils/constants');

describe('createTagToken', () => {
  it(`creates all token types successfully`, () => {
    constants.ALL_TAGS.forEach((tag) => {
      // Text tokens are created by createTextToken
      if (tag === constants.TEXT_TAG) {
        return;
      }
      const input = tag === constants.VARIABLE_TAG
        ? `{{foobar}}`
        : `{{${tag}foobar}}`;

      const token = createTagToken(input, constants.DEFAULT_REGEXPS);
      expect(token).toEqual({
        type: tag,
        rawContents: input,
        key: `foobar`,
      });
    });
  });

  it(`only creates the first token encountered`, () => {
    const input = `{{foo}}{{bar}}`;
    const token = createTagToken(input, constants.DEFAULT_REGEXPS);
    expect(token).toEqual({
      type: constants.VARIABLE_TAG,
      rawContents: `{{foo}}`,
      key: `foo`,
    });
  });

  it(`throws an error when an unclosed tag is encountered`, () => {
    const input = `{{foobar`;
    expect(() => createTagToken(input, constants.DEFAULT_REGEXPS)).toThrow();

    const input2 = `{{foo {{bar}}`;
    expect(() => createTagToken(input2, constants.DEFAULT_REGEXPS)).toThrow();

    const input3 = `{{foo {{bar}} }}`
    expect(() => createTagToken(input3, constants.DEFAULT_REGEXPS)).toThrow();
  });

  it(`includes a newline in rawContents for the correct tokens`, () => {
    constants.ALL_TAGS.forEach((tag) => {
      if (tag === constants.TEXT_TAG) {
        return;
      }
      const input = tag === constants.VARIABLE_TAG
        ? `{{foobar}}\n`
        : `{{${tag}foobar}}\n`;

      const token = createTagToken(input, constants.DEFAULT_REGEXPS);
      const shouldIncludeNewline = tag !== constants.VARIABLE_TAG
        && tag !== constants.PARTIAL_TAG;

      const expectedContents = shouldIncludeNewline
        ? input
        : input.trim();

      expect(token).toEqual({
        type: tag,
        rawContents: expectedContents,
        key: `foobar`,
      });
    });
  });
});



























