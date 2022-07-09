import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect, beforeEach } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let file1;
let file2;

beforeEach(() => {
  file1 = getFixturePath('file1.json');
  file2 = getFixturePath('file2.json');
});

test('main1', async () => {
  const actual = genDiff(file1, file2);
  const plain = readFile('plain1.txt');

  expect(actual).toEqual(plain);
});
