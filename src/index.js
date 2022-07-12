import _ from 'lodash';
import { parseData } from './parsers.js';

const findDifference = (obj1, obj2) => {
  const firstObjectEntries = Object.entries(obj1);
  const secondObjectEntries = Object.entries(obj2);
  const allEntriesOfObjects = _.union(firstObjectEntries, secondObjectEntries).sort();

  const result = allEntriesOfObjects.reduce((acc, [key, value]) => {
    if (_.isObject(value)) {
      return findDifference(obj1[key], obj2[key]);
    }
    if (!Object.hasOwn(obj2, key)) {
      acc[`- ${key}`] = obj1[key];
    } else if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] !== obj2[key]) {
        acc[`- ${key}`] = obj1[key];
        acc[`+ ${key}`] = obj2[key];
      } else {
        acc[`  ${key}`] = obj1[key];
      }
    } else {
      acc[`+ ${key}`] = obj2[key];
    }
    return acc;
  }, {});
  return result;
};

const convertToString = (obj) => {
  const stringifyObject = JSON.stringify(obj, null, 2);
  const stringifyStyledObject = stringifyObject.replaceAll(/"|,/g, '');
  return stringifyStyledObject;
};

const genDiff = (filepath1, filepath2) => {
  const objectOne = parseData(filepath1);
  const objectTwo = parseData(filepath2);

  const objectsDifference = findDifference(objectOne, objectTwo);
  const differenceString = convertToString(objectsDifference);

  return differenceString;
};

export default genDiff;
