const fs = require('fs');
const {
  DEFAULT_OPENING_RE,
  DEFAULT_CLOSING_RE,
  DEFAULT_NEWLINE_CLOSING_RE,
  TAG_RE,
  TEXT_TAG,
  VARIABLE_TAG,
  SECTION_TAG,
  CLOSING_TAG,
  PARTIAL_TAG,
  INVERTED_TAG,
  COMMENT_TAG,
  DELIMITER_TAG,
} = require('./lib/utils/constants');

const hasType = require('./lib/tokens/hasType');
const escapeRegExp = require('./lib/utils/escapeRegExp');

const tagHandlers = {
  [TEXT_TAG]: ({ rawContents }) => rawContents,
  [VARIABLE_TAG]: ({ type, rawContents, key }, context) => context[key] || ``,
  [SECTION_TAG]: (token) => ``,
  [INVERTED_TAG]: (token) => ``,
  [CLOSING_TAG]: (token) => ``,
  [COMMENT_TAG]: (token) => ``,
  [DELIMITER_TAG]: (token) => ``,
  [PARTIAL_TAG]: ({ type, rawContents, key }, context, partialLoader) => {
    return render(
      partialLoader(key, context),
      context,
      partialLoader,
    );
  },
};

const readTemplate = (templateId) => {
  return fs.readFileSync(`./tests/${templateId}`, { encoding: 'utf8' });
};

const isArray = (x) => Array.isArray(x);
const isBoolean = (x) => typeof x === `boolean`;

const getTagKey = (contents, type, tags) => {
  const [openingRe, closingRe, newlineClosingRe] = tags;
  const removedOpen = contents.replace(openingRe, ``);

  // Don't replace TAG_RE if the token represents a variable
  return type !== VARIABLE_TAG
   ? removedOpen.replace(TAG_RE, ``).replace(closingRe, ``).trim()
   : removedOpen.replace(closingRe, ``).trim()
}

const getTagToken = (template, tagRegexes) => {
  const [openingRe, closingRe, newlineClosingRe] = tagRegexes;
  // Remove the opening `{{`
  const contentsWithoutOpeningBrace = template.slice(2);
  const tagMatch = contentsWithoutOpeningBrace.match(TAG_RE);

  const type = tagMatch && tagMatch.index === 0
    ? contentsWithoutOpeningBrace.slice(0, 1)
    : VARIABLE_TAG;

  const shouldRemoveNewLine = type !== VARIABLE_TAG
    && type !== PARTIAL_TAG;

  // We need to handle newlines differently for sections
  const closingMatch = shouldRemoveNewLine
    ? template.match(newlineClosingRe)
    : template.match(closingRe);

  if (closingMatch) {
    const rawContents = template.slice(
      0,
      closingMatch.index + closingMatch[0].length,
    );

    const key = getTagKey(rawContents, type, tagRegexes);

    // If there is still an opening tag in the tag contents, then the tag was
    // not closed properly
    if (key.match(openingRe)) {
      throw new Error(`Unclosed tag: ${rawContents}`);
    }

    return { type, rawContents, key };
  } else {
    const badLine = template.split('\n')[0]
    throw new Error(`Unclosed tag: ${badLine}`);
  }
}

/* Returns a text token of all chars before a match was found */
const getTextToken = (str, endIndex) => ({
  type: TEXT_TAG,
  rawContents: endIndex === 0 ? `` : str.slice(0, endIndex),
  key: ``,
});

const isSectionToken = (token) => hasType(token, SECTION_TAG);
const isInvertedToken = (token) => hasType(token, INVERTED_TAG);
const isSectionBlock = (token) => isArray(token);
const isClosingToken = (token) => hasType(token, CLOSING_TAG);

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
      if (lastToken.type !== CLOSING_TAG) {
        throw new Error(`Unclosed section ${sectionTokens[0].rawContents}`);
      }

      return _format(remaining, [...currentTokens, sectionTokens]);
    } else if (isClosingToken(head)) {
      return [[...currentTokens, head], tail];
    }

    return _format(tail, [...currentTokens, head])
  };

  // Remove any empty string text tags that may have been created
  const filteredTokens = tokens.filter(({ type, rawContents }) => {
    return type !== TEXT_TAG || rawContents !== ``;
  });

  const [parsed, remaining] = _format(filteredTokens, []);

  return parsed;
}

const getNewTagRegExps = (delimiterTagContents) => {
  const newTags = delimiterTagContents.split(' ');
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
    const newString = str.replace(text.rawContents, ``).replace(token.rawContents, ``);
    const newTags = token.type === DELIMITER_TAG
      ? getNewTagRegExps(token.key)
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
  const { type, rawContents, key } = tokens[0];
  const sectionContext = context[key];
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

  const { type, rawContents, key } = token;
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
        nested: {
          foo: 'bar'
        },
      },
      text: 'Partial text',
    },
    partialLoader,
  );

  console.log(renderedText);
};

main();

module.exports = {
  parse,
  render,
};
