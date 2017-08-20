/**
 * formatTokens.js
 * Written by: Connor Taylor
 */
const hasType = require('../hasType');
const {
  SECTION_TAG,
  INVERTED_TAG,
  CLOSING_TAG,
  TEXT_TAG,
} = require('../../utils/constants');

/*
 * Formats the array of tokens such that section or inverted tags are
 * encapsulated in their own arrays.
 */
module.exports = (tokens) => {
  const _format = (remainingTokens, currentTokens) => {
    const [head, ...tail] = remainingTokens;
    if (!head) {
      return [currentTokens, []];
    }

    if (hasType(head, SECTION_TAG) || hasType(head, INVERTED_TAG)) {
      const [sectionTokens, remaining] = _format(tail, [head]);
      const lastToken = sectionTokens.slice(-1)[0];
      if (lastToken.type !== CLOSING_TAG) {
        throw new Error(`Unclosed section ${sectionTokens[0].rawContents}`);
      }

      return _format(remaining, [...currentTokens, sectionTokens]);
    } else if (hasType(head, CLOSING_TAG)) {
      return [[...currentTokens, head], tail];
    }

    return _format(tail, [...currentTokens, head])
  };

  // Remove any empty string text tags that may have been created
  const filteredTokens = tokens.filter(({ type, rawContents }) => {
    return type !== TEXT_TAG || rawContents !== ``;
  });

  const [parsed, remaining] = _format(filteredTokens, []);

  return parsed;
}
