import _ from 'lodash';

const newLine = (depth) => `  ${' '.repeat(4).repeat(depth - 1)}`;
const bracket = (depth) => `${' '.repeat(4).repeat(depth)}`;
const insLine = (key, value, char, depth) => `${newLine(depth)}${char}${key}: ${value}`;
const bracketsWrap = (body, depth) => `{\n${body}\n${bracket(depth)}}`;

const makeValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const entries = Object.entries(value);
  const items = entries.map(([key, val]) => insLine(key, makeValue(val, depth + 1), '  ', depth + 1));
  const body = items.join('\n');
  return bracketsWrap(body, depth);
};

const getStylishDiff = (diff, depth) => {
  const items = diff.flatMap(({ key, value, state }) => {
    const symbols = { added: '+ ', removed: '- ', unchanged: '  ' };

    if (state === 'updated') {
      return [insLine(key, makeValue(value.previousValue, depth + 1), symbols.removed, depth + 1),
        insLine(key, makeValue(value.newValue, depth + 1), symbols.added, depth + 1)];
    }

    if (state === 'nested') {
      return insLine(key, getStylishDiff(value, depth + 1), '  ', depth + 1);
    }

    return insLine(key, makeValue(value, depth + 1), symbols[state], depth + 1);
  });
  const body = items.join('\n');

  return bracketsWrap(body, depth);
};

const makeStylishFormat = (diff) => getStylishDiff(diff, 0);

export default makeStylishFormat;
