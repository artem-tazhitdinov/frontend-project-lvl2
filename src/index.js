import { getFilePath, readFile, getFileExtension } from './utils.js';
import parseData from './parsers.js';
import getFormatting from './formatters/index.js';
import buildTree from './buildTree.js';

const genDiff = (filepath1, filepath2, formatStyle = 'stylish') => {
  const path1 = getFilePath(filepath1);
  const object1 = parseData(readFile(path1), getFileExtension(filepath1));

  const path2 = getFilePath(filepath2);
  const object2 = parseData(readFile(path2), getFileExtension(filepath2));

  const tree = buildTree(object1, object2);
  return getFormatting(tree, formatStyle);
};

export default genDiff;
