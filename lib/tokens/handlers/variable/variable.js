/**
 * variable.js
 * Written by: Connor Taylor
 */

/*
 * Processes a variable token and returns the changes to the render config.
 * Variable tokens may have an additional context key, which should be
 * prioritized over the context that was passed.
 */
const variable = ({ tokens, renderedStr, context }) => {
  const [token] = tokens;

  return {
    renderedStr: token.context
      ? `${renderedStr}${token.context[token.key]}`
      : `${renderedStr}${context[token.key]}`,
  };
};

export default variable;
