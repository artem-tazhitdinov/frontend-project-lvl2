import _ from 'lodash';

const buildTree = (data1, data2) => {
  const dataKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  return dataKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'removed' };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, value: buildTree(data1[key], data2[key]), type: 'complex' };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: data1[key], type: 'unchanged' };
    }
    return { key, value: { value1: data1[key], value2: data2[key] }, type: 'updated' };
  });
};

export default buildTree;
