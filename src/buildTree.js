import _ from 'lodash';

const buildTree = (data1, data2) => {
  const dataKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const diffTree = dataKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'removed' };
    }
    if (data1[key] === data2[key]) {
      return { key, value: data1[key], type: 'unchanged' };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, value: buildTree(data1[key], data2[key]), type: 'complex' };
    }
    return { key, value: { value1: data1[key], value2: data2[key] }, type: 'updated' };
  });

  return diffTree;
};

export default buildTree;
