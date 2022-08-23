import _ from 'lodash';
import { parseData } from './parsers.js';
import getFormatting from './formatters/index.js';

const findDifference = (objOne, objTwo) => {
  const objOneKeys = Object.keys(objOne);
  const objTwokeys = Object.keys(objTwo);
  const objectsKeys = _.sortBy(_.union(objOneKeys, objTwokeys));

  const diffResult = objectsKeys.map((key) => {
    if (!_.has(objOne, key)) {
      return { key, value: objTwo[key], status: 'added' };
    }
    if (!_.has(objTwo, key)) {
      return { key, value: objOne[key], status: 'removed' };
    }
    if (objOne[key] === objTwo[key]) {
      return { key, value: objOne[key], status: 'unchanged' };
    }
    if (_.isObject(objOne[key]) && _.isObject(objTwo[key])) {
      return { key, value: findDifference(objOne[key], objTwo[key]), status: 'nested' };
    }
    return { key, value: { previousValue: objOne[key], newValue: objTwo[key] }, status: 'updated' };
  });
  return diffResult;
};

const genDiff = (filepathOne, filepathTwo, formatStyle = 'stylish') => {
  const objectOne = parseData(filepathOne);
  const objectTwo = parseData(filepathTwo);

  const objectsDifference = findDifference(objectOne, objectTwo);
  return getFormatting(objectsDifference, formatStyle);
};

export default genDiff;
