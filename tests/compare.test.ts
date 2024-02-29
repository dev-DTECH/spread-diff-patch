import fs from 'fs';
// import crypto from 'crypto';
import { diff, readCSV } from '../src';
import { CSV } from '../src/formatter/csv';

test('Calculate diffCount', () => {
    const actualFilePath = "tests/data/actual-financial-data.csv"
    const expectedFilePath = "tests/data/expected-financial-data.csv"
    const actualAOA = readCSV<string>(actualFilePath)
    const expectedAOA = readCSV<string>(expectedFilePath)
    const diffAOA = diff<string>(actualAOA, expectedAOA)
    expect(diffAOA.diffCount).toEqual(21876)
})

test('Write delta CSV', () => {
    const actualFilePath = "tests/data/actual-financial-data.csv"
    const expectedFilePath = "tests/data/expected-financial-data.csv"
    const actualAOA = readCSV<string>(actualFilePath)
    const expectedAOA = readCSV<string>(expectedFilePath)
    const diffAOA = diff<string>(actualAOA, expectedAOA)
    const csv = diffAOA.format(new CSV())
    fs.mkdirSync("tests/delta", { recursive: true })
    fs.writeFileSync("tests/delta/diff-financial-data.csv", csv)
    // const actualFileString = fs.readFileSync('tests/delta/diff-financial-data.csv').toString()
    // const expectedFileString = fs.readFileSync('tests/data/expected-diff-financial-data.csv').toString()
    const actualDiffAOA = readCSV<string>('tests/delta/diff-financial-data.csv')
    const expectedDiffAOA = readCSV<string>('tests/data/expected-diff-financial-data.csv')
    expect(actualDiffAOA).toEqual(expectedDiffAOA);
})