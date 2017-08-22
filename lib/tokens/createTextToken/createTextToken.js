/**
 * createTextToken.js
 * Written by: Connor Taylor
 */
import constants from '../../utils/constants';

/* Creates a new text token of all chars before a match was found */
const createTextToken = (str, endIndex) => ({
  type: constants.TEXT_TAG,
  rawContents: str.slice(0, endIndex),
  key: ``,
});

export default createTextToken;
