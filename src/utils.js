import path from 'path';
import { readFileSync } from 'fs';

export const getFileName = (cliArgument) => path.parse(cliArgument).base;

export const readFile = (filepath) => readFileSync(filepath, 'utf8');

export const getFileExtension = (filename) => path.extname(filename).slice(1);

export const getFilePath = (cliArgument) => {
  const fileName = getFileName(cliArgument);
  const currentPath = process.cwd();
  return path.resolve(currentPath, path.parse(cliArgument).dir, fileName);
};
