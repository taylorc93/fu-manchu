/**
 * createTextToken.js
 * Written by: Connor Taylor
 */
const { TEXT_TAG } = require('../../utils/constants');

/* Creates a new text token of all chars before a match was found */
module.exports = (str, endIndex) => ({
  type: TEXT_TAG,
  rawContents: str.slice(0, endIndex),
  key: ``,
});
