/**
 * render.js
 * Written by: Connor Taylor
 */
import parse from '../parse';
import tokenHandlers from '../tokens/tokenHandlers';

const render = (template, context = {}, partialLoader) => {
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

    const handler = tokenHandlers[token.type];
    const configChanges = handler(
      { ...config, context: currentContext },
      partialLoader,
      render,
    );

    return processTokens({
      ...config,
      tokens: tokens.slice(1),
      ...configChanges,
    });
  };

  return processTokens({
    tokens: parse(template),
    contextPath: [],
    renderedStr: ``,
  });
};

export default render;
