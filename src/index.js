import path from 'path';
import { readFileSync } from 'fs';
import toParse from './parsers.js';
import getFormatting from './formatters/index.js';
import buildTree from './buildTree.js';

const readFile = (filePath) => readFileSync(filePath, 'utf8');
const getFileExtension = (fileName) => path.extname(fileName).slice(1);
const buildFullfilePath = (fileName) => path.resolve(process.cwd(), fileName);

const genDiff = (filePath1, filePath2, formatStyle = 'stylish') => {
  const path1 = buildFullfilePath(filePath1);
  const data1 = toParse(readFile(path1), getFileExtension(filePath1));

  const path2 = buildFullfilePath(filePath2);
  const data2 = toParse(readFile(path2), getFileExtension(filePath2));

  const tree = buildTree(data1, data2);
  return getFormatting(tree, formatStyle);
};

export default genDiff;
