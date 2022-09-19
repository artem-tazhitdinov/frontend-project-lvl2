import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultStylish = readFile('test_stylish_format.txt');
const resultPlain = readFile('test_plain_format.txt');
const resultJson = readFile('test_json_format.txt');

describe('Test for JSON', () => {
  const jsonFile1 = getFixturePath('file1.json');
  const jsonFile2 = getFixturePath('file2.json');

  test('Testing default formatter', () => {
    const actual = genDiff(jsonFile1, jsonFile2);
    expect(actual).toEqual(resultStylish);
  });

  test('Testing stylish formatter work with JSON files', () => {
    const actual = genDiff(jsonFile1, jsonFile2, 'stylish');
    expect(actual).toEqual(resultStylish);
  });

  test('Testing plain formatter work with JSON files', () => {
    const actual = genDiff(jsonFile1, jsonFile2, 'plain');
    expect(actual).toEqual(resultPlain);
  });

  test('Testing JSON parsing', () => {
    const parseJson = () => genDiff(jsonFile1, jsonFile2, 'json');
    expect(parseJson).not.toThrowError();
  });

  test('Testing JSON formatter work', () => {
    const actual = genDiff(jsonFile1, jsonFile2, 'json');
    expect(actual).toEqual(resultJson);
  });
});

describe('Test for YML', () => {
  const ymlFile1 = getFixturePath('file1.yml');
  const ymlFile2 = getFixturePath('file2.yml');

  test('Testing stylish formatter work with YAML files', () => {
    const actual = genDiff(ymlFile1, ymlFile2, 'stylish');
    expect(actual).toEqual(resultStylish);
  });

  test('Testing plain formatter work with YAML files', () => {
    const actual = genDiff(ymlFile1, ymlFile2, 'plain');
    expect(actual).toEqual(resultPlain);
  });
});
