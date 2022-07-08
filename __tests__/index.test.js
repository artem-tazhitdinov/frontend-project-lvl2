import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('main', async () => {
  const file1 = await getFixturePath('file1.json');
  const file2 = await getFixturePath('file2.json');

  const actual = genDiff(file1, file2);
  const plain = readFile('plain1.txt');
  expect(actual).toEqual(plain);

  const actual2 = genDiff(file2, file1);
  const plain2 = readFile('plain2.txt');
  expect(actual2).toEqual(plain2);
});
