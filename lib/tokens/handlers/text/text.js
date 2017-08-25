/**
 * text.js
 * Written by: Connor Taylor
 */

/* Processes a text token and returns the changes to the render config. */
const text = ({ tokens, renderedStr }) => ({
  renderedStr: `${renderedStr}${tokens[0].rawContents}`,
});

export default text;
