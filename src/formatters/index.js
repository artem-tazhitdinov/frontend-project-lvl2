import stylishFormat from './stylish.js';
import plainFormat from './plain.js';

const formatStyles = { json: JSON.stringify, plain: plainFormat, stylish: stylishFormat };

const format = (diff, formatName) => {
  const formatter = formatStyles[formatName];
  return formatter(diff);
};

export default format;
