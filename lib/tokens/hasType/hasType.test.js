const hasType = require(`./hasType`);
const constants = require(`../../utils/constants`);

describe(`hasType`, () => {
  it(`handles variable tags`, () => {
    const token = {
      type: constants.VARIABLE_TAG,
      rawContents: `{{foo}}`,
      key: `foo`,
    };

    expect(hasType(token, constants.VARIABLE_TAG)).toBe(true);
  });

  it(`handles section tags`, () => {
    const token = {
      type: constants.SECTION_TAG,
      rawContents: `{{#foo}}`,
      key: `foo`,
    };

    expect(hasType(token, constants.SECTION_TAG)).toBe(true);
  });

  it(`handles closing tags`, () => {
    const token = {
      type: constants.CLOSING_TAG,
      rawContents: `{{/foo}}`,
      key: `foo`,
    };

    expect(hasType(token, constants.CLOSING_TAG)).toBe(true);
  });

  it(`handles partial tags`, () => {
    const token = {
      type: constants.PARTIAL_TAG,
      rawContents: `{{>foo}}`,
      key: `foo`,
    };

    expect(hasType(token, constants.PARTIAL_TAG)).toBe(true);
  });

  it(`handles comment tags`, () => {
    const token = {
      type: constants.COMMENT_TAG,
      rawContents: `{{!foo}}`,
      key: `foo`,
    };

    expect(hasType(token, constants.COMMENT_TAG)).toBe(true);
  });

  it(`handles delimiter tags`, () => {
    const token = {
      type: constants.DELIMITER_TAG,
      rawContents: `{{=foo}}`,
      key: `foo`,
    };

    expect(hasType(token, constants.DELIMITER_TAG)).toBe(true);
  });

  it(`handles inverted tags`, () => {
    const token = {
      type: constants.INVERTED_TAG,
      rawContents: `{{^foo}}`,
      key: `foo`,
    };

    expect(hasType(token, constants.INVERTED_TAG)).toBe(true);
  });

  it(`handles text tags`, () => {
    const token = {
      type: constants.TEXT_TAG,
      rawContents: `foo`,
      key: `foo`,
    };

    expect(hasType(token, constants.TEXT_TAG)).toBe(true);
  });

  it(`throws an error when an invalid type is supplied`, () => {
    const token = {
      type: constants.TEXT_TAG,
      rawContents: `foo`,
      key: `foo`,
    };

    expect(() => hasType(token, ``)).toThrow();
  });
});
