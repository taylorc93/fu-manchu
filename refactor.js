const fs = require('fs');

const openingRegex = /\{\{/;
const closingRe = /\s*\}\}/;
const newlineClosingRe = /\s*\}\}\n/;
const tagRe = /#|\^|\/|>|\{|&|=|!/;

const SECTION_TAG = `#`;
const CLOSING_TAG = `/`;
const PARTIAL_TAG = `>`;
const INVERTED_TAG = `^`;
const COMMENT_TAG = `!`;

const tagHandlers = {
  text: (token) => token[1],
  name: ([type, contents, contextKey], context) => context[contextKey] || ``,
  [SECTION_TAG]: (token) => ``,
  [INVERTED_TAG]: (token) => ``,
  [CLOSING_TAG]: (token) => ``,
  [COMMENT_TAG]: (token) => ``,
  [PARTIAL_TAG]: (token) => token[1],
};

const readTemplate = (templateId) => {
  return fs.readFileSync(`./tests/${templateId}`, { encoding: 'utf8' });
};

const isArray = (x) => Array.isArray(x);
const isBoolean = (x) => typeof x === `boolean`;

const getTagToken = (template) => {
  // Remove the opening `{{`
  const tagContents = template.slice(2);
  const tagMatch = tagContents.match(tagRe);

  const tagType = tagMatch && tagMatch.index === 0
    ? tagContents.slice(0, 1)
    : `name`;

  const removeNewLine = tagType !== `text` && tagType !== `name`;
  // We need to handle newlines better for sections
  const closingMatch = removeNewLine
    ? template.match(newlineClosingRe)
    : template.match(closingRe);

  if (closingMatch) {
    const fullTag = template.slice(
      0,
      closingMatch.index + closingMatch[0].length,
    );
    const tagContents = fullTag
      .replace(openingRegex, ``)
      .replace(tagRe, ``)
      .replace(closingRe, ``)
      .trim();

    return [tagType, fullTag, tagContents];
  } else {
    throw new Error(`Unclosed tag starting at index ${openingMatch.index}`);
  }
}

/* Returns a text token of all chars before a match was found */
const getTextToken = (str, endIndex) => {
  return [
    `text`,
    endIndex === 0 ? `` : str.slice(0, endIndex),
  ];
}

const isSectionToken = (token) => token[0] === SECTION_TAG;
const isInvertedToken = (token) => token[0] === INVERTED_TAG;
const isSectionBlock = (token) => isArray(token[0]);
const isClosingToken = (token) => token[0] === CLOSING_TAG;

/*
 * Formats the array of tokens such that sections are encapsulated in their
 * own arrays
 */
const formatTokens = (tokens) => {
  const _format = (remainingTokens, currentTokens) => {
    const [head, ...tail] = remainingTokens;
    if (!head) {
      return [currentTokens, []];
    }

    if (isSectionToken(head) || isInvertedToken(head)) {
      const [sectionTokens, remaining] = _format(tail, [head]);
      return _format(remaining, [...currentTokens, sectionTokens]);
    } else if (isClosingToken(head)) {
      return [[...currentTokens, head], tail];
    }

    return _format(tail, [...currentTokens, head])
  };

  const [parsed, remaining] = _format(tokens, []);

  return parsed;
}


const parse = (template) => {
  const _parse = (str, tokens) => {
    const openingMatch = str.match(openingRegex);

    if (!openingMatch) {
      // Get any text that might be after the last tag
      const text = getTextToken(str, str.length - 1);
      return [...tokens, text];
    }

    const text = getTextToken(str, openingMatch.index);
    const token = getTagToken(str.slice(openingMatch.index));

    const newString = str.replace(text[1], ``).replace(token[1], ``);

    return _parse(newString, [...tokens, text, token]);
  };

  return formatTokens(
    _parse(template, []),
  );
};

/* Handles processing a block of section tokens */
const handleSectionBlock = (
  tokens,
  context,
  partialLoader,
  renderedString,
) => {
  const [type, tag, contextKey] = tokens[0];
  const sectionContext = context[contextKey];
  const tokensToProcess = tokens.slice(1, -1);

  if (isBoolean(sectionContext)) {
    const shouldRender = type === INVERTED_TAG
      ? !sectionContext
      : sectionContext;

    return shouldRender
      ? processTokens(tokensToProcess, {}, partialLoader, ``)
      : ``;
  } else if (isArray(sectionContext)) {
    return sectionContext.reduce((str, ctx) => {
      const processedSection = processTokens(
        tokensToProcess,
        ctx,
        partialLoader,
        ``,
      );

      return `${str}${processedSection}`;
    }, renderedString);
  }

  return processTokens(
    tokensToProcess,
    sectionContext,
    partialLoader,
    ``,
  );
}


const processTokens = (tokens, context, partialLoader, renderedString) => {
  const [token, ...rest] = tokens;

  if (!token) {
    return renderedString;
  }

  // Check if this is a section block
  if (isSectionBlock(token)) {
    const sectionStr =  handleSectionBlock(
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

  const [type, contents, contextKey] = token;
  const handler = tagHandlers[type];

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

const render = (template, context, partialLoader) => {
  const tokens = parse(template);

  return processTokens(tokens, context, partialLoader, ``);
};

const main = () => {
  const template = readTemplate(`basic.txt`);
  const renderedText = render(template, {
    variable: 'foobar',
    variable2: 1234,
    arraySection: [
      { sectionVar: 'whos' },
      { sectionVar: 'on' },
      { sectionVar: 'first' },
    ],
    emptySection: [],
    indentedVariable: 'Im indented',
    booleanSection: false,
    objectSection: {
      text: 'Hello world!',
    },
  });

  console.log(renderedText);
};

main();

// module.exports = {
//   parse,
//   render,
// };
