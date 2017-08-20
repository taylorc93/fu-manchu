/**
 * escapeRegExp.js
 * Written by: Connor Taylor
 */

/* Given an input string, escapes all special characters such that when the new
 * string is passed to the RegExp constructor, it will search for the specific
 * character instead of treating it as a special character.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 */
module.exports = (str) => str.replace(
  /[.*+?^${}()|[\]\\]/g,
  '\\$&',
);
