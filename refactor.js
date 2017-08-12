const fs = require('fs');

const whiteRe = /\s*/;
const spaceRe = /\s+/;
const equalsRe = /\s*=/;
const openingRegex = /\{\{/;
const closingRe = /\s*\}\}/;
const tagRe = /#|\^|\/|>|\{|&|=|!/;

const readTemplate = (templateId) => {
  return fs.readFileSync(`./tests/${templateId}`, { encoding: 'utf8' });
};

const getTag = (template) => {
  // Remove the opening `{{`
  const tagContents = template.slice(2);
  const tagMatch = tagContents.match(tagRe);

  const tagType = tagMatch && tagMatch.index === 0
    ? tagContents.slice(1)
    : `name`;

  const closingMatch = template.match(closingRe);

  if (closingMatch) {
    const fullTag = template.slice(0, closingMatch.index + 2);

    return [tagType, fullTag];
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

const parse = (template) => {
  const _parse = (str, tokens) => {
    const openingMatch = str.match(openingRegex);

    if (!openingMatch) {
      return tokens;
    }

    const text = getTextBeforeMatch(str, openingMatch);
    const token = getTag(str.slice(openingMatch.index));  

    const newTokens = [
      ...tokens,
      text,
      token,
    ];

    const newString = str.replace(text[1], ``).replace(token[1], ``);

    return _parse(newString, newTokens);
  };

  return _parse(template, []);
};

const render = (template, context, partialLoader) => {
  const tokens = parse(template);
};

const main = () => {
  const template = readTemplate(`basic.txt`);
  const tokens = parse(template);

  console.log(tokens);
};

main();

// module.exports = {
//   parse,
//   render,
// };
