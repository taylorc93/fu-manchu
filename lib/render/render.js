/**
 * render.js
 * Written by: Connor Taylor
 */
import parse from '../parse';
import constants from '../utils/constants';
import isArray from '../utils/isArray';
import isBoolean from '../utils/isBoolean';

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

const defaultHandler = () => ({});
const textHandler = ({ tokens, renderedStr }) => ({
  renderedStr: `${renderedStr}${tokens[0].rawContents}`,
});
const variableHandler = ({ tokens, renderedStr, context }) => {
  const [token] = tokens;
  return {
    renderedStr: token.context
      ? `${renderedStr}${token.context[token.key]}`
      : `${renderedStr}${context[token.key]}`,
  };
};
const closingHandler = ({ contextPath }) => ({
  contextPath: contextPath.slice(1),
});
const sectionHandler = (config) => {
  const { tokens, contextPath, context } = config;
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
  }

  return {
    contextPath: [...contextPath, tokens[0].key],
  };
};
const invertedHandler = ({ tokens, contextPath, context }) => {
  const newContext = context[tokens[0].key];
  const closingTagIndex = tokens.findIndex((t) => t.type === CLOSING_TAG);

  return newContext
    ? { tokens: tokens.slice(closingTagIndex) }
    : { contextPath: [...contextPath, tokens[0].key] };
};

const HANDLER_MAPPINGS = {
  [TEXT_TAG]: textHandler,
  [VARIABLE_TAG]: variableHandler,
  [SECTION_TAG]: sectionHandler,
  [INVERTED_TAG]: invertedHandler,
  [PARTIAL_TAG]: ({ tokens, context, renderedStr }, partialLoader) => {
    const renderedPartial = render( // eslint-disable-line
      partialLoader(tokens[0].key, context),
      context,
      partialLoader,
    );

    return {
      renderedStr: `${renderedStr}${renderedPartial}`,
    };
  },
  // closing tags will be handled by the section handler
  [CLOSING_TAG]: closingHandler,
  [COMMENT_TAG]: defaultHandler,
  [DELIMITER_TAG]: defaultHandler,
};

const render = (template, context, partialLoader) => {
  // TODO: Add caching logic to prevent reparsing when possible
  const processTokens = (config) => {
    const { tokens, contextPath, renderedStr } = config;
    const [token] = tokens;

    if (!token) {
      return renderedStr;
    }

    const currentContext = contextPath.reduce((ctx, k) => {
      if (!ctx) {
        throw new Error(`Context lookup failed for ${token.rawContents}`);
      }

      return ctx[k];
    }, context);

    const handler = HANDLER_MAPPINGS[token.type];
    const configChanges = handler(
      { ...config, context: currentContext },
      partialLoader,
    );

    return processTokens({
      ...config,
      tokens: tokens.slice(1),
      ...configChanges,
    });
  };

  const tokens = parse(template);

  return processTokens({
    tokens,
    contextPath: [],
    renderedStr: ``,
  });
};

export default render;
