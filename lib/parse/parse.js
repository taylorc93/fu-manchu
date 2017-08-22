/**
 * parse.js
 * Written by: Connor Taylor
 */
import constants from '../utils/constants';
import createTextToken from '../tokens/createTextToken';
import createTagToken from '../tokens/createTagToken';
import getNewTagRegExps from '../tags/getNewTagRegExps';

const { DELIMITER_TAG, DEFAULT_REGEXPS, TEXT_TAG } = constants;

export default (template) => {
  const parse = (str, tokens, tags) => {
    const [openingRe] = tags;
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

    return parse(remainingStr, [...tokens, text, token], newTags);
  };

  const allTokens = parse(template, [], DEFAULT_REGEXPS);

  // Remove any empty string text tags that may have been created
  return allTokens.filter(({ type, rawContents }) => {
    return type !== TEXT_TAG || rawContents !== ``;
  });
};
