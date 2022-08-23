import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2keys = Object.keys(obj2);
  const objectsKeys = _.sortBy(_.union(obj1Keys, obj2keys));

  const diffTree = objectsKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], status: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], status: 'removed' };
    }
    if (obj1[key] === obj2[key]) {
      return { key, value: obj1[key], status: 'unchanged' };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, value: buildTree(obj1[key], obj2[key]), status: 'nested' };
    }
    return { key, value: { previousValue: obj1[key], newValue: obj2[key] }, status: 'updated' };
  });

  return diffTree;
};

export default buildTree;
