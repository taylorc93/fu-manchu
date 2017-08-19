const fs = require('fs');

const DEFAULT_OPENING_RE = /\{\{/;
const DEFAULT_CLOSING_RE = /\s*\}\}/;
const DEFAULT_NEWLINE_CLOSING_RE = /\s*\}\}(\n?)/;
const TAG_RE = /#|\^|\/|>|\{|&|=|!/;

const TEXT_TAG = `text`;
const VARIABLE_TAG = `variable`;
const SECTION_TAG = `#`;
const CLOSING_TAG = `/`;
const PARTIAL_TAG = `>`;
const INVERTED_TAG = `^`;
const COMMENT_TAG = `!`;
const DELIMITER_TAG = `=`;

const tagHandlers = {
  [TEXT_TAG]: (token) => token[1],
  [VARIABLE_TAG]: ([type, contents, contextKey], context) => context[contextKey] || ``,
  [SECTION_TAG]: (token) => ``,
  [INVERTED_TAG]: (token) => ``,
  [CLOSING_TAG]: (token) => ``,
  [COMMENT_TAG]: (token) => ``,
  [DELIMITER_TAG]: (token) => ``,
  [PARTIAL_TAG]: ([type, contents, partialKey], context, partialLoader) => {
    return render(
      partialLoader(partialKey, context),
      context,
      partialLoader,
    );
  },
};

const readTemplate = (templateId) => {
  return fs.readFileSync(`./tests/${templateId}`, { encoding: 'utf8' });
};

const escapeRegExp = (str) => str.replace(
  /[\-\[\]{}()*+?.,\\\^$|#\s]/g,
  '\\$&',
);

const isArray = (x) => Array.isArray(x);
const isBoolean = (x) => typeof x === `boolean`;

const getTagContents = (contents, type, tags) => {
  const [openingRe, closingRe, newlineClosingRe] = tags;
  const removedOpen = contents.replace(openingRe, ``);

  // Don't replace TAG_RE if the token represents a variable
  return type !== VARIABLE_TAG
   ? removedOpen.replace(TAG_RE, ``).replace(closingRe, ``).trim()
   : removedOpen.replace(closingRe, ``).trim()
}

const getTagToken = (template, tags) => {
  const [openingRe, closingRe, newlineClosingRe] = tags;
  // Remove the opening `{{`
  const tagContents = template.slice(2);
  const tagMatch = tagContents.match(TAG_RE);

  const tagType = tagMatch && tagMatch.index === 0
    ? tagContents.slice(0, 1)
    : VARIABLE_TAG;

  const removeNewLine = tagType !== VARIABLE_TAG
    && tagType !== PARTIAL_TAG;

  // We need to handle newlines better for sections
  const closingMatch = removeNewLine
    ? template.match(newlineClosingRe)
    : template.match(closingRe);

  if (closingMatch) {
    const fullTag = template.slice(
      0,
      closingMatch.index + closingMatch[0].length,
    );

    const tagContents = getTagContents(fullTag, tagType, tags);

    // If there is still an opening tag in the tag contents, then the tag was
    // not closed properly
    if (tagContents.match(openingRe)) {
      throw new Error(`Unclosed tag ${fullTag}`);
    }

    return [tagType, fullTag, tagContents];
  } else {
    const badLine = template.split('\n')[0]
    throw new Error(`Unclosed tag for line ${badLine}`);
  }
}

/* Returns a text token of all chars before a match was found */
const getTextToken = (str, endIndex) => {
  return [
    TEXT_TAG,
    endIndex === 0 ? `` : str.slice(0, endIndex),
  ];
}

const isSectionToken = (token) => token[0] === SECTION_TAG;
const isInvertedToken = (token) => token[0] === INVERTED_TAG;
const isSectionBlock = (token) => isArray(token[0]);
const isClosingToken = (token) => token[0] === CLOSING_TAG;

/*
 * Formats the array of tokens such that section or inverted tags are
 * encapsulated in their own arrays.
 */
const formatTokens = (tokens) => {
  const _format = (remainingTokens, currentTokens) => {
    const [head, ...tail] = remainingTokens;
    if (!head) {
      return [currentTokens, []];
    }

    if (isSectionToken(head) || isInvertedToken(head)) {
      const [sectionTokens, remaining] = _format(tail, [head]);
      const lastToken = sectionTokens.slice(-1)[0];
      if (lastToken[0] !== CLOSING_TAG) {
        throw new Error(`Unclosed section ${sectionTokens[0][1]}`);
      }

      return _format(remaining, [...currentTokens, sectionTokens]);
    } else if (isClosingToken(head)) {
      return [[...currentTokens, head], tail];
    }

    return _format(tail, [...currentTokens, head])
  };

  // Remove any empty string text tags
  const filteredTokens = tokens.filter((t) => {
    return t[0] !== TEXT_TAG || t[1] !== ``;
  });

  const [parsed, remaining] = _format(filteredTokens, []);

  return parsed;
}

const getNewTags = (tokenContents) => {
  const newTags = tokenContents.split(' ');
  if (newTags.length !== 2) {
    throw new Error(`Set delimter tag contains invalid number of tags. It must be 2 (opening and closing), you included ${newTags.length}`);
  }

  return [
    new RegExp(escapeRegExp(newTags[0])),
    new RegExp(`\\s*` + escapeRegExp(newTags[1])),
    new RegExp(`\\s*` + escapeRegExp(newTags[1]) + '\\n'),
  ];
}

const parse = (template) => {
  const _parse = (str, tokens, tags) => {
    const openingRe = tags[0];
    const openingMatch = str.match(openingRe);

    if (!openingMatch) {
      // Get any text that might be after the last tag
      const text = getTextToken(str, str.length);
      return [...tokens, text];
    }

    const text = getTextToken(str, openingMatch.index);
    const token = getTagToken(str.slice(openingMatch.index), tags);

    // Remove the text and tag contents to process the next part of the string
    const newString = str.replace(text[1], ``).replace(token[1], ``);
    const newTags = token[0] === DELIMITER_TAG
      ? getNewTags(token[2])
      : tags;

    return _parse(newString, [...tokens, text, token], newTags);
  };

  const rawTokens = _parse(
    template,
    [],
    [DEFAULT_OPENING_RE, DEFAULT_CLOSING_RE, DEFAULT_NEWLINE_CLOSING_RE],
  );

  return formatTokens(rawTokens);
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
  const template = readTemplate(`unclosedSection.txt`);
  const partialLoader = (t, context) => {
    if (t === `basicPartial`) {
      return `I am a partial`;
    } else {
      return `{{text}}`;
    }
  };

  const renderedText = render(
    template,
    {
      variable: 'foobar',
      variable2: 1234,
      arraySection: [
        { sectionVar: 'whos' },
        { sectionVar: 'on' },
        { sectionVar: 'first' },
      ],
      emptySection: [],
      indentedVariable: 'I am indented',
      booleanSection: false,
      objectSection: {
        text: 'Hello world!',
      },
      text: 'Partial text',
    },
    partialLoader
  );

  console.log(renderedText);
};

main();

// module.exports = {
//   parse,
//   render,
// };
