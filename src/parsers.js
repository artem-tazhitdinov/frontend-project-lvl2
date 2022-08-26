import yaml from 'js-yaml';

const parsers = { json: JSON.parse, yml: yaml.load, yaml: yaml.load };

const toParse = (data, format) => parsers[format](data);

export default toParse;
