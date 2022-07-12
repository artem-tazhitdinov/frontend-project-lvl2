import _ from 'lodash';
import { parseData } from './parsers.js';

const findDifference = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2keys = Object.keys(obj2);
  const objectsKeys = _.union(obj1Keys, obj2keys).sort();

  const result = [];
  for (const key of objectsKeys) {
    if (!Object.hasOwn(obj1, key)) {
      result.push({ key, value: obj2[key], status: 'added' });
    } else if (!Object.hasOwn(obj2, key)) {
      result.push({ key, value: obj1[key], status: 'deleted' });
    } else if (obj1[key] !== obj2[key]) {
      result.push({
        key, value: obj2[key], oldValue: obj1[key], status: 'changed',
      });
    } else {
      result.push({ key, value: obj1[key], status: 'unchanged' });
    }
  }
  return result;
};
/*
const convertToString = (obj) => {
  const stringifyObject = JSON.stringify(obj, null, 2);
  const stringifyStyledObject = stringifyObject.replaceAll(/"|,/g, '');
  return stringifyStyledObject;
};
*/
const genDiff = (filepath1, filepath2) => {
  const objectOne = parseData(filepath1);
  const objectTwo = parseData(filepath2);

  const objectsDifference = findDifference(objectOne, objectTwo);
  // const differenceString = convertToString(objectsDifference);
  return objectsDifference;
  // return differenceString;
};

export default genDiff;
