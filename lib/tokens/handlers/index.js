import text from './text';
import variable from './variable';
import section from './section';
import closing from './closing';
import partial from './partial';
import inverted from './inverted';
import comment from './comment';
import delimiter from './delimiter';

import constants from '../../utils/constants';

const {
  TEXT_TAG,
  VARIABLE_TAG,
  SECTION_TAG,
  CLOSING_TAG,
  PARTIAL_TAG,
  INVERTED_TAG,
  COMMENT_TAG,
  DELIMITER_TAG,
} = constants;

export default {
  [TEXT_TAG]: text,
  [VARIABLE_TAG]: variable,
  [SECTION_TAG]: section,
  [CLOSING_TAG]: closing,
  [PARTIAL_TAG]: partial,
  [INVERTED_TAG]: inverted,
  [COMMENT_TAG]: comment,
  [DELIMITER_TAG]: delimiter,
};
