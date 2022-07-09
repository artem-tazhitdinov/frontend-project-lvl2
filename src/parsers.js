import yaml from 'js-yaml';
import fs from 'fs';
import { getFileName, getFileExtension, getFilePath } from './utils.js';

export const toParseJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

export const toParseYaml = (filePath) => yaml.load(fs.readFileSync(filePath, 'utf-8'));

export const parseData = (file) => {
  const fileName = getFileName(file);
  const filePath = getFilePath(file, fileName);
  const fileExtension = getFileExtension(filePath);

  switch (fileExtension) {
    case '.json':
      return toParseJSON(filePath);
    case '.yml':
      return toParseYaml(filePath);
    case '.yaml':
      return toParseYaml(filePath);
    default:
      return toParseJSON(filePath);
  }
};
