/**
 * getNewTagRegExps.js
 * Written by: Connor Taylor
 */
import escapeRegExp from '../../utils/escapeRegExp';

const getNewTagRegExps = (delimiterTagContents) => {
  const newTags = delimiterTagContents.split(` `);
  if (newTags.length !== 2) {
    throw new Error(`Set delimter tag contains invalid number of tags. It must be 2 (opening and closing), you included ${newTags.length}`);
  }

  return [
    new RegExp(escapeRegExp(newTags[0])),
    new RegExp(`\\s*${escapeRegExp(newTags[1])}`),
    new RegExp(`\\s*${escapeRegExp(newTags[1])}\\n`),
  ];
};

export default getNewTagRegExps;
