import path from 'path';

export const getFileName = (cliArgument) => path.parse(cliArgument).base;

export const getFileExtension = (cliArgument) => path.parse(cliArgument).ext;

export const getFilePath = (cliArgument) => {
  const fileName = getFileName(cliArgument);
  const currentPath = process.cwd();
  return path.resolve(currentPath, path.parse(cliArgument).dir, fileName);
};
