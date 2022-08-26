import _ from 'lodash';

const buildTree = (data1, data2) => {
  const dataKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const diffTree = dataKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], status: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value: data1[key], status: 'removed' };
    }
    if (data1[key] === data2[key]) {
      return { key, value: data1[key], status: 'unchanged' };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, value: buildTree(data1[key], data2[key]), status: 'nested' };
    }
    return { key, value: { previousValue: data1[key], newValue: data2[key] }, status: 'updated' };
  });

  return diffTree;
};

export default buildTree;
