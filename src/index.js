import { parseData } from './parsers.js';
import getFormatting from './formatters/index.js';
import buildTree from './buildTree.js';

const genDiff = (filepath1, filepath2, formatStyle = 'stylish') => {
  const object1 = parseData(filepath1);
  const object2 = parseData(filepath2);

  const tree = buildTree(object1, object2);
  return getFormatting(tree, formatStyle);
};

export default genDiff;
