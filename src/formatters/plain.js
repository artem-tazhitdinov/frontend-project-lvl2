import _ from 'lodash';

const makeStringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const makePlainFormat = (diff, root = []) => {
  const types = {
    added: ({ value }, path) => `Property '${path.join('.')}' was added with value: ${makeStringify(value)}`,
    removed: (empty, path) => `Property '${path.join('.')}' was removed`,
    updated: ({ value2, value1 }, path) => (
      `Property '${path.join('.')}' was updated. From ${makeStringify(value1)} to ${makeStringify(value2)}`),
    complex: ({ children }, path) => makePlainFormat(children, path),
    unchanged: () => null,
  };

  const plainDiff = diff.map((node) => {
    const { key, type } = node;
    const newPath = [...root, key];
    return types[type](node, newPath);
  });

  const result = _.compact(_.flatten(plainDiff));
  return result.join('\n');
};

export default makePlainFormat;
