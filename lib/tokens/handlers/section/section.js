/**
 * section.js
 * Written by: Connor Taylor
 */
import isArray from '../../../utils/isArray';
import isBoolean from '../../../utils/isBoolean';
import isFunction from '../../../utils/isFunction';

import constants from '../../../utils/constants';

const { CLOSING_TAG } = constants;

/*
 * Processes a section token and returns the changes to the render config. In
 * each case, this will update the contextPath (since we're in a new section).
 * Sections have a few cases depending on the type of the context:
 * 1. Array - Returns a new set of tokens by adding N iterations of the section
 *    contents, where N is the number of items in the context
 * 2. Boolean - If the context is false, returns a new set of tokens that
 *    excludes the section contents
 * 3. Function - Passes the section text to the function. Returns a new set of
 *    tokens without the section contents and the new rendered contents.
 */
const section = (config, partialLoader, render) => {
  const { tokens, contextPath, context, renderedStr } = config;
  const newContext = context[tokens[0].key];
  const closingTagIndex = tokens.findIndex((t) => t.type === CLOSING_TAG);
  const tokensInSection = tokens.slice(1, closingTagIndex);

  if (isArray(newContext)) {
    return {
      tokens: [
        ...newContext.reduce((accum, ctx) => {
          return [
            ...accum,
            ...tokensInSection.map((t) => ({
              ...t,
              context: ctx, // Save the context on the token object
            })),
          ];
        }, []),
        ...tokens.slice(closingTagIndex),
      ],
      contextPath: [...contextPath, tokens[0].key],
    };
  } else if (isBoolean(newContext)) {
    return newContext
      ? { contextPath: [...contextPath, tokens[0].key] }
      : { tokens: tokens.slice(closingTagIndex) };
  } else if (isFunction(newContext)) {
    // Get the raw text for the function to process
    const text = tokensInSection.reduce((str, t) => {
      return `${str}${t.rawContents}`;
    }, ``);

    const renderedText = newContext()(text, render, context);

    return {
      tokens: tokens.slice(closingTagIndex),
      contextPath: [...contextPath, tokens[0].key],
      renderedStr: `${renderedStr}${renderedText}`,
    };
  }

  return {
    contextPath: [...contextPath, tokens[0].key],
  };
};

export default section;
