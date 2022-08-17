import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const getFormatting = (diff, formatName) => {
  const formatStyles = {
    plain: formatPlain,
    stylish: formatStylish,
  };
  const formatter = formatStyles[formatName];
  return formatter(diff);
};

export default getFormatting;
