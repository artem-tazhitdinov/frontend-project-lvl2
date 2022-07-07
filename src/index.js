import path from 'path';

import fs from 'fs';

const genDiff = (filepath1, filepath2) => {
  const currentPath = process.cwd();

  const firstFileName = path.parse(filepath1).base;
  const secondFileName = path.parse(filepath2).base;

  const firstFilePath = path.resolve(currentPath, path.parse(filepath1).dir, firstFileName);
  const secondFilePath = path.resolve(currentPath, path.parse(filepath2).dir, secondFileName);

  const objectOne = JSON.parse(fs.readFileSync(firstFilePath, 'utf-8'));
  const objectTwo = JSON.parse(fs.readFileSync(secondFilePath, 'utf-8'));

  const result = [objectOne, objectTwo];
  return result;
};

export default genDiff;
