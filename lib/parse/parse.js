/**
 * parse.js
 * Written by: Connor Taylor
 */
const { isArray, isBoolean, constants } = require('../utils');
const createTextToken = require('../tokens/createTextToken');
const createTagToken = require('../tokens/createTagToken');
const formatTokens = require('../tokens/formatTokens');
const getNewTagRegExps = require('../tags/getNewTagRegExps');

const { DELIMITER_TAG, DEFAULT_REGEXPS } = constants;

module.exports = (template) => {
  const _parse = (str, tokens, tags) => {
    const openingRe = tags[0];
    const openingMatch = str.match(openingRe);

    if (!openingMatch) {
      // Get any text that might be after the last tag
      const text = createTextToken(str, str.length);
      return [...tokens, text];
    }

    const text = createTextToken(str, openingMatch.index);
    const token = createTagToken(str.slice(openingMatch.index), tags);

    // Remove the text and tag contents to process the next part of the string
    const remainingStr = str
      .replace(text.rawContents, ``)
      .replace(token.rawContents, ``);

    // If we encountered a delimiter tag, we need to update the tag regexps
    // accordingly
    const newTags = token.type === DELIMITER_TAG
      ? getNewTagRegExps(token.key)
      : tags;

    return _parse(remainingStr, [...tokens, text, token], newTags);
  };

  return formatTokens(_parse(template, [], DEFAULT_REGEXPS));
};
