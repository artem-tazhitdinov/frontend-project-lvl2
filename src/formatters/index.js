import _ from 'lodash';
import stylishFormat from './stylish.js';
import plainFormat from './plain.js';

const formatStyles = {
  json: JSON.stringify,
  plain: plainFormat,
  stylish: stylishFormat,
};

const format = (diff, formatName) => {
  const formatter = formatStyles[formatName];
  if (!_.has(formatStyles, formatName)) {
    throw new Error(`Error, unknown format: ${formatName}`);
  }
  return formatter(diff);
};

export default format;
