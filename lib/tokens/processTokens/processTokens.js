/**
 * processTokens.js
 * Written by: Connor Taylor
 */
const handleSectionBlock = require(`../handleSectionBlock`);

// Section blocks are created in formatTokens. These are sub arrays inside of
// the main array that are processed recursively.
const isSectionBlock = (token) => isArray(token);

/* Given an array of formatted tokens, returns a correctly rendered string */
module.exports = (
  tokens,
  context,
  partialLoader,
  renderedString,
  tagHandlers,
) => {
  const [token, ...rest] = tokens;

  if (!token) {
    return renderedString;
  }

  if (isSectionBlock(token)) {
    const sectionStr = handleSectionBlock(
      token,
      context,
      partialLoader,
      ``,
    );

    return processTokens(
      rest,
      context,
      partialLoader,
      `${renderedString}${sectionStr}`,
    );
  }

  const handler = tagHandlers[token.type];
  const renderedContents = handler(
    token,
    context,
    partialLoader,
  );

  return processTokens(
    rest,
    context,
    partialLoader,
    `${renderedString}${renderedContents}`,
  );
};
