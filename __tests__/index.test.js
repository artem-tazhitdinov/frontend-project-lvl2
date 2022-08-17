import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect, beforeEach } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let jsonFile1;
let jsonFile2;

let ymlFile1;
let ymlFile2;

beforeEach(() => {
  jsonFile1 = getFixturePath('file1.json');
  jsonFile2 = getFixturePath('file2.json');

  ymlFile1 = getFixturePath('file1.yml');
  ymlFile2 = getFixturePath('file2.yml');
});

test('Testing stylish formatter work with JSON files', async () => {
  const actual = genDiff(jsonFile1, jsonFile2, 'stylish');
  const sample = readFile('test_stylish_format.txt');

  expect(actual).toEqual(sample);
});

test('Testing stylish formatter work with YAML files', async () => {
  const actual = genDiff(ymlFile1, ymlFile2, 'stylish');
  const sample = readFile('test_stylish_format.txt');

  expect(actual).toEqual(sample);
});

test('Testing plain formatter work with JSON files', async () => {
  const actual = genDiff(jsonFile1, jsonFile2, 'plain');
  const sample = readFile('test_plain_format.txt');

  expect(actual).toEqual(sample);
});

test('Testing plain formatter work with YAML files', async () => {
  const actual = genDiff(ymlFile1, ymlFile2, 'plain');
  const sample = readFile('test_plain_format.txt');

  expect(actual).toEqual(sample);
});

test('Testing JSON formatter work', async () => {
  const actual = genDiff(jsonFile1, jsonFile2, 'json');
  const sample = readFile('test_json_format.txt');

  expect(actual).toEqual(sample);
});
