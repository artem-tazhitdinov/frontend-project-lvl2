import yaml from 'js-yaml';
import fs from 'fs';

export const toParseJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

export const toParseYaml = (filePath) => yaml.load(fs.readFileSync(filePath, 'utf-8'));
