/**
 * hasType.js
 * Written by: Connor Taylor
 */
const constants = require('../../utils/constants');

module.exports = (tagToken, type) => {
  if (!constants.ALL_TAGS.includes(type)) {
    throw new Error(`Invalid token type: ${type}`);
  }

  return tagToken.type === type;
};
