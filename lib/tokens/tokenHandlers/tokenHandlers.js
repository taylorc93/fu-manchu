/**
 * tokenHandlers.js
 * Written by: Connor Taylor
 */
import isArray from '../../utils/isArray';
import isBoolean from '../../utils/isBoolean';
import isFunction from '../../utils/isFunction';

import constants from '../../utils/constants';

const {
  TEXT_TAG,
  VARIABLE_TAG,
  SECTION_TAG,
  CLOSING_TAG,
  PARTIAL_TAG,
  INVERTED_TAG,
  COMMENT_TAG,
  DELIMITER_TAG,
} = constants;

const tokenHandlers = {
  [TEXT_TAG]: ({ tokens, renderedStr }) => ({
    renderedStr: `${renderedStr}${tokens[0].rawContents}`,
  }),
  [VARIABLE_TAG]: ({ tokens, renderedStr, context }) => {
    const [token] = tokens;

    return {
      renderedStr: token.context
        ? `${renderedStr}${token.context[token.key]}`
        : `${renderedStr}${context[token.key]}`,
    };
  },
  [SECTION_TAG]: (config, partialLoader, render) => {
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
                context: ctx,
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
      const text = tokensInSection.reduce((str, t) => {
        return `${str}${t.rawContents}`;
      }, ``);

      const renderedText = newContext()(text, render, context); // eslint-disable-line

      return {
        tokens: tokens.slice(closingTagIndex),
        contextPath: [...contextPath, tokens[0].key],
        renderedStr: `${renderedStr}${renderedText}`,
      };
    }

    return {
      contextPath: [...contextPath, tokens[0].key],
    };
  },
  [INVERTED_TAG]: ({ tokens, contextPath, context }) => {
    const newContext = context[tokens[0].key];
    const closingTagIndex = tokens.findIndex((t) => t.type === CLOSING_TAG);

    return newContext
      ? { tokens: tokens.slice(closingTagIndex) }
      : { contextPath: [...contextPath, tokens[0].key] };
  },
  [PARTIAL_TAG]: ({ tokens, context, renderedStr }, partialLoader, render) => {
    const renderedPartial = render( // eslint-disable-line
      partialLoader(tokens[0].key, context),
      context,
      partialLoader,
    );

    return {
      renderedStr: `${renderedStr}${renderedPartial}`,
    };
  },
  [CLOSING_TAG]: ({ contextPath }) => ({
    contextPath: contextPath.slice(1),
  }),
  [COMMENT_TAG]: () => ({}),
  [DELIMITER_TAG]: () => ({}),
};

export default tokenHandlers;
