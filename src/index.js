import path from 'path';

import fs from 'fs';

import _ from 'lodash';

const getFileName = (cliArgument) => path.parse(cliArgument).base;

const getFilePath = (cliArgument) => {
  const fileName = getFileName(cliArgument);
  const currentPath = process.cwd();
  return path.resolve(currentPath, path.parse(cliArgument).dir, fileName);
};

const createObject = (file) => {
  const fileName = getFileName(file);
  const filePath = getFilePath(file, fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const findDifference = (obj1, obj2) => {
  const result = {};
  const firstObjectKeys = Object.keys(obj1);
  const secondObjectKeys = Object.keys(obj2);
  const allKeysOfObjects = _.uniq([...firstObjectKeys, ...secondObjectKeys]);
  allKeysOfObjects.sort();

  for (const key of allKeysOfObjects) {
    if (!Object.hasOwn(obj2, key)) {
      result[`- ${key}`] = obj1[key];
    } else if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] !== obj2[key]) {
        result[`- ${key}`] = obj1[key];
        result[`+ ${key}`] = obj2[key];
      } else {
        result[`  ${key}`] = obj1[key];
      }
    } else {
      result[`+ ${key}`] = obj2[key];
    }
  }
  return result;
};

const convertToString = (obj) => {
  const stringifyObject = JSON.stringify(obj, null, 2);
  const stringifyStyledObject = stringifyObject.replaceAll(/"|,/g, '');
  return stringifyStyledObject;
};

const genDiff = (filepath1, filepath2) => {
  const objectOne = createObject(filepath1);
  const objectTwo = createObject(filepath2);

  const objectsDifference = findDifference(objectOne, objectTwo);
  const differenceString = convertToString(objectsDifference);

  return differenceString;
};

export default genDiff;
