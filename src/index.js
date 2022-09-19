import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildTree from './buildTree.js';

const extractFormat = (fileName) => path.extname(fileName).slice(1);
const buildFullPath = (fileName) => path.resolve(process.cwd(), fileName);

const getData = (fullPath) => parse(readFileSync(fullPath, 'utf8'), extractFormat(fullPath));

const genDiff = (filePath1, filePath2, formatStyle = 'stylish') => {
  const data1 = getData(buildFullPath(filePath1));
  const data2 = getData(buildFullPath(filePath2));
  const tree = buildTree(data1, data2);

  return format(tree, formatStyle);
};

export default genDiff;
