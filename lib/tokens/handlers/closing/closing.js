/**
 * closing.js
 * Written by: Connor Taylor
 */

/* Processes a closing token and returns the changes to the render config. */
const closing = ({ contextPath }) => ({
  contextPath: contextPath.slice(1),
});

export default closing;
