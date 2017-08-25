/**
 * partial.js
 * Written by: Connor Taylor
 */

/* Processes a partial token and returns the changes to the render config. */
const partial = ({ tokens, context, renderedStr }, partialLoader, render) => {
  const renderedPartial = render( // eslint-disable-line
    partialLoader(tokens[0].key, context),
    context,
    partialLoader,
  );

  return {
    renderedStr: `${renderedStr}${renderedPartial}`,
  };
};

export default partial;
