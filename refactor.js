const fs = require('fs');
const { isArray, isBoolean, constants } = require('./lib/utils');

const hasType = require('./lib/tokens/hasType');
const escapeRegExp = require('./lib/utils/escapeRegExp');
const parse = require('./lib/parse');

const {
  TAG_RE,
  TEXT_TAG,
  VARIABLE_TAG,
  SECTION_TAG,
  CLOSING_TAG,
  PARTIAL_TAG,
  INVERTED_TAG,
  COMMENT_TAG,
  DELIMITER_TAG,
} = constants;

const tagHandlers = {
  [TEXT_TAG]: ({ rawContents }) => rawContents,
  [VARIABLE_TAG]: ({ key }, context) => context[key] || ``,
  [SECTION_TAG]: () => ``,
  [INVERTED_TAG]: () => ``,
  [CLOSING_TAG]: () => ``,
  [COMMENT_TAG]: () => ``,
  [DELIMITER_TAG]: () => ``,
  [PARTIAL_TAG]: ({ key }, context, partialLoader) => {
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

const isSectionBlock = (token) => isArray(token);

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
