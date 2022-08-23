import yaml from 'js-yaml';

export const parseData = (data, extension) => {
  const parserExtensions = { json: JSON.parse, yml: yaml.load };
  return parserExtensions[extension](data);
};
