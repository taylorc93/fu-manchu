const fs = require('fs');

const whiteRe = /\s*/;
const spaceRe = /\s+/;
const equalsRe = /\s*=/;
const openingRegex = /\{\{/;
const closingRe = /\s*\}\}/;
const tagRe = /#|\^|\/|>|\{|&|=|!/;

const SECTION_TAG = `#`;
const CLOSING_TAG = `/`;
const PARTIAL_TAG = `>`;

const tagHandlers = {
  text: (token) => token[1],
  name: ([type, contents, contextKey], context) => context[contextKey],
  [SECTION_TAG]: (token) => token[1],
  [CLOSING_TAG]: (token) => token[1],
  [PARTIAL_TAG]: (token) => token[1],
};

const readTemplate = (templateId) => {
  return fs.readFileSync(`./tests/${templateId}`, { encoding: 'utf8' });
};

const getTag = (template) => {
  // Remove the opening `{{`
  const tagContents = template.slice(2);
  const tagMatch = tagContents.match(tagRe);

  const tagType = tagMatch && tagMatch.index === 0
    ? tagContents.slice(0, 1)
    : `name`;

  const closingMatch = template.match(closingRe);

  if (closingMatch) {
    const fullTag = template.slice(0, closingMatch.index + 2);
    const tagContents = fullTag
      .replace(openingRegex, ``)
      .replace(tagRe, ``)
      .replace(closingRe, ``);

    return [tagType, fullTag, tagContents];
  } else {
    throw new Error(`Unclosed tag starting at index ${openingMatch.index}`);
  }
}

/* Returns a text token of all chars before a match was found */
const getTextBeforeMatch = (str, match) => {
  return [
    `text`,
    match.index === 0 ? `` : str.slice(0, match.index)
  ];
}

const isSectionToken = (token) => {
  return token[0] === SECTION_TAG;
}

const isClosingToken = (token) => {
  return token[0] === CLOSING_TAG;
}


const formatTokens = (tokens) => {
  const _format = (remainingTokens, currentTokens) => {
    const [head, ...tail] = remainingTokens;
    if (!head) {
      return [currentTokens, []];
    }

    if (isSectionToken(head)) {
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
      const text = getTextBeforeMatch(str, { index: str.length - 1 });
      return [...tokens, text];
    }

    const text = getTextBeforeMatch(str, openingMatch);
    const token = getTag(str.slice(openingMatch.index));  
    const newString = str.replace(text[1], ``).replace(token[1], ``);

    return _parse(newString, [...tokens, text, token]);
  };

  const rawTokens = _parse(template, []);

  return formatTokens(rawTokens);
};

const render = (template, context, partialLoader) => {
  const tokens = parse(template);

  return tokens.reduce((str, token) => {
    const [type, contents, contextKey] = token;
    const handler = tagHandlers[type];

    const renderedContents = handler(
      token,
      context,
      partialLoader,
    );

    return `${str}${renderedContents}`;
  }, '');
};

const main = () => {
  const template = readTemplate(`basic.txt`);
  const renderedText = render(template, {});

  console.log(renderedText);
};

main();

// module.exports = {
//   parse,
//   render,
// };
