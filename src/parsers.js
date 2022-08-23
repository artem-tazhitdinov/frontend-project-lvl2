import yaml from 'js-yaml';

const parseData = (data, extension) => {
  const parserExtensions = { json: JSON.parse, yml: yaml.load };
  return parserExtensions[extension](data);
};

export default parseData;
