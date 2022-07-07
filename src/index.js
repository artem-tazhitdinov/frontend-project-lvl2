import path from 'path';

import fs from 'fs';

import _ from 'lodash';

const getFilePath = (cliArgument, fileName) => {
  const currentPath = process.cwd();
  return path.resolve(currentPath, path.parse(cliArgument).dir, fileName);
};

const getFileName = (filepath) => path.parse(filepath).base;

const createObject = (filepath) => {
  const fileName = getFileName(filepath);
  const filePath = getFilePath(filepath, fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const genDiff = (filepath1, filepath2) => {
  const result = {};
  const objectOne = createObject(filepath1);
  const objectTwo = createObject(filepath2);

  const firstObjectKeys = Object.keys(objectOne);
  const secondObjectKeys = Object.keys(objectTwo);
  const allKeysOfObjects = _.uniq([...firstObjectKeys, ...secondObjectKeys].sort());

  for (const key of allKeysOfObjects) {
    if (!Object.hasOwn(objectTwo, key)) {
      result[`- ${key}`] = objectOne[key];
    } else if (Object.hasOwn(objectOne, key) && Object.hasOwn(objectTwo, key)) {
      if (objectOne[key] !== objectTwo[key]) {
        result[`- ${key}`] = objectOne[key];
        result[`+ ${key}`] = objectTwo[key];
      } else {
        result[`  ${key}`] = objectOne[key];
      }
    } else {
      result[`+ ${key}`] = objectTwo[key];
    }
  }

  const stringifyObject = JSON.stringify(result, null, 2);
  const stringifyStyledObject = stringifyObject.replaceAll(/"|,/g, '');
  return stringifyStyledObject;
};

export default genDiff;
