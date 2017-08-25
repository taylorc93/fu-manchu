/**
 * createTagToken.js
 * Written by: Connor Taylor
 */
import constants from '../../utils/constants';

const { TAG_RE, VARIABLE_TAG, PARTIAL_TAG } = constants;

/* Given a string and a set of regexes to match on, creates a new tag token
 * by parsing the string properly. Expects the provided string to match the
 * opening regex (ie. /\{\{/ by default)
 */
const createTagToken = (str, tagRegexes) => {
  const [openingRegExp, closingRegExp, newlineClosingRegExp] = tagRegexes;
  const openingMatch = str.match(openingRegExp);
  const openRemovedStr = str.slice(openingMatch[0].length);
  const tagMatch = openRemovedStr.match(TAG_RE);
  const type = tagMatch && tagMatch.index === 0
    ? openRemovedStr.slice(0, 1)
    : VARIABLE_TAG;

  // Unless we have a variable or partial tag, we want to remove a newline
  // if there's one at the end of a tag
  const shouldRemoveNewLine = type !== VARIABLE_TAG
    && type !== PARTIAL_TAG;

  const closingMatch = str.match(
    shouldRemoveNewLine ? newlineClosingRegExp : closingRegExp,
  );

  if (closingMatch) {
    const rawContents = str.slice(
      0,
      closingMatch.index + closingMatch[0].length,
    );

    // If we have a variable tag, we don't want to replace TAG_RE since it
    // may remove part of a custom delimiter. 
    const key = rawContents
      .replace(openingRegExp, ``)
      .replace(type !== VARIABLE_TAG ? TAG_RE : ``, ``)
      .replace(closingRegExp, ``)
      .trim();

    // If there is still an opening tag in the tag contents, then the tag was
    // not closed properly (ie. a new tag was started before closing the
    // previous one)
    if (key.match(openingRegExp)) {
      throw new Error(`Unclosed tag: ${rawContents}`);
    }

    return { type, rawContents, key };
  }

  // If there was no closing tag match, we need to throw an error
  const [badLine] = str.split(`\n`);
  throw new Error(`Unclosed tag: ${badLine}`);
};

export default createTagToken;
