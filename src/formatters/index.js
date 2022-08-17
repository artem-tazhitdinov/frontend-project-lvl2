import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import JsonFormat from './json.js';

const getFormatting = (diff, formatName) => {
  const formatStyles = {
    json: JsonFormat,
    plain: plainFormat,
    stylish: stylishFormat,
  };
  const formatter = formatStyles[formatName];
  return formatter(diff);
};

export default getFormatting;
