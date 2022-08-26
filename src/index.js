import path from 'path';
import { readFileSync } from 'fs';
import toParse from './parsers.js';
import getFormatting from './formatters/index.js';
import buildTree from './buildTree.js';

const readFile = (filePath) => readFileSync(filePath, 'utf8');
const selectFormat = (fileName) => path.extname(fileName).slice(1);
const buildFullfilePath = (fileName) => path.resolve(process.cwd(), fileName);

const getData = (fullPath) => toParse(readFile(fullPath), selectFormat(fullPath));

const genDiff = (filePath1, filePath2, formatStyle = 'stylish') => {
  const data1 = getData(buildFullfilePath(filePath1));
  const data2 = getData(buildFullfilePath(filePath2));
  const tree = buildTree(data1, data2);

  return getFormatting(tree, formatStyle);
};

export default genDiff;
