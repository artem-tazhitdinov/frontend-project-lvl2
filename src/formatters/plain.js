import _ from 'lodash';

const makeValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const makePlainFormat = (diff, path = []) => {
  const filteredDiff = diff.filter((item) => item.status !== 'unchanged');
  const result = filteredDiff.map((item) => {
    const newPath = path.concat(item.key);
    const node = newPath.join('.');

    if (item.status === 'removed') {
      return `Property '${node}' was removed`;
    }

    if (item.status === 'added') {
      const val = makeValue(item.value);
      return `Property '${node}' was added with value: ${val}`;
    }

    if (item.status === 'updated') {
      const oldVal = makeValue(item.value.previousValue);
      const newVal = makeValue(item.value.newValue);
      return `Property '${node}' was updated. From ${oldVal} to ${newVal}`;
    }

    return makePlainFormat(item.value, newPath);
  }).join('\n');

  return result;
};

export default makePlainFormat;
