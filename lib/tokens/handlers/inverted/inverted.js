/**
 * inverted.js
 * Written by: Connor Taylor
 */
import isArray from '../../../utils/isArray';
import constants from '../../../utils/constants';

const { CLOSING_TAG } = constants;

/* Processes a inverted token and returns the changes to the render config. */
const inverted = ({ tokens, contextPath, context }) => {
  const newContext = context[tokens[0].key];
  const closingTagIndex = tokens.findIndex((t) => t.type === CLOSING_TAG);

  return newContext || (isArray(newContext) && newContext.length === 0)
    ? { tokens: tokens.slice(closingTagIndex) }
    : { contextPath: [...contextPath, tokens[0].key] };
};

export default inverted;
