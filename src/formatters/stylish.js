import _ from 'lodash';

const newLine = (depth) => `  ${' '.repeat(4).repeat(depth - 1)}`;
const bracket = (depth) => `${' '.repeat(4).repeat(depth)}`;
const insLine = (key, value, char, depth) => `${newLine(depth)}${char}${key}: ${value}`;
const bracketsWrap = (body, depth) => `{\n${body}\n${bracket(depth)}}`;

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const entries = Object.entries(value);
  const items = entries.map(([key, val]) => insLine(key, stringify(val, depth + 1), '  ', depth + 1));
  const body = items.join('\n');
  return bracketsWrap(body, depth);
};

const getStylishDiff = (diff, depth) => {
  const items = diff.flatMap(({ key, value, type }) => {
    const symbols = { added: '+ ', removed: '- ', unchanged: '  ' };

    if (type === 'updated') {
      return [insLine(key, stringify(value.value1, depth + 1), symbols.removed, depth + 1),
        insLine(key, stringify(value.value2, depth + 1), symbols.added, depth + 1)];
    }

    if (type === 'complex') {
      return insLine(key, getStylishDiff(value, depth + 1), '  ', depth + 1);
    }

    return insLine(key, stringify(value, depth + 1), symbols[type], depth + 1);
  });
  const body = items.join('\n');

  return bracketsWrap(body, depth);
};

const makeStylishFormat = (diff) => getStylishDiff(diff, 0);

export default makeStylishFormat;
