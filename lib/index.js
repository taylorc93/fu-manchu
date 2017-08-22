import fs from 'fs';

import render from './render';

const readTemplate = (templateId) => {
  return fs.readFileSync(`./tests/${templateId}`, { encoding: `utf8` });
};

const main = () => {
  const template = readTemplate(`basic.txt`);
  const partialLoader = (t) => {
    if (t === `basicPartial`) {
      return `I am a partial`;
    }
    return `{{text}}`;
  };

  const renderedText = render(
    template,
    {
      variable: `foobar`,
      variable2: 1234,
      arraySection: [
        { sectionVar: `whos` },
        { sectionVar: `on` },
        { sectionVar: `first` },
      ],
      emptySection: [],
      indentedVariable: `I am indented`,
      booleanSection: true,
      objectSection: {
        text: `Hello world!`,
        nested: {
          foo: `bar`,
        },
      },
      text: `Partial text`,
    },
    partialLoader,
  );

  console.log(renderedText);
};

main();
