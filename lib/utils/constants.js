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

export default {
  // Regex constants
  DEFAULT_OPENING_RE,
  DEFAULT_CLOSING_RE,
  DEFAULT_NEWLINE_CLOSING_RE,
  TAG_RE,

  // Tag type constants
  TEXT_TAG,
  VARIABLE_TAG,
  SECTION_TAG,
  CLOSING_TAG,
  PARTIAL_TAG,
  INVERTED_TAG,
  COMMENT_TAG,
  DELIMITER_TAG,

  // Conveniences
  ALL_TAGS: [
    TEXT_TAG,
    VARIABLE_TAG,
    SECTION_TAG,
    CLOSING_TAG,
    PARTIAL_TAG,
    INVERTED_TAG,
    COMMENT_TAG,
    DELIMITER_TAG,
  ],
  DEFAULT_REGEXPS: [
    DEFAULT_OPENING_RE,
    DEFAULT_CLOSING_RE,
    DEFAULT_NEWLINE_CLOSING_RE,
  ],
};
