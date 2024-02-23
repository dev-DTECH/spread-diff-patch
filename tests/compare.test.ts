import { diff, readCSV } from '../src';
import { CSV } from '../src/formatter/csv';
import fs from 'fs';
import crypto from 'crypto';


test('Calculate diffCount', () => {
    const actualFilePath = "tests/data/actual-financial-data.csv"
    const expectedFilePath = "tests/data/expected-financial-data.csv"
    const actualAOA = readCSV<string>(actualFilePath)
    const expectedAOA = readCSV<string>(expectedFilePath)
    const diffAOA = diff<string>(actualAOA, expectedAOA)
    expect(diffAOA.diffCount).toEqual(3)
})

test('Write delta CSV', () => {
    const actualFilePath = "tests/data/actual-financial-data.csv"
    const expectedFilePath = "tests/data/expected-financial-data.csv"
    const actualAOA = readCSV<string>(actualFilePath)
    const expectedAOA = readCSV<string>(expectedFilePath)
    const diffAOA = diff<string>(actualAOA, expectedAOA)
    const csv = diffAOA.format(new CSV())
    fs.writeFileSync("tests/delta/diff-financial-data.csv", csv)
    const actualFileChecksum = crypto.createHash('sha256').update(fs.readFileSync('tests/delta/diff-financial-data.csv')).digest('hex');
    const expectedFileChecksum = crypto.createHash('sha256').update(fs.readFileSync('tests/data/expected-diff-financial-data.csv')).digest('hex')

    expect(actualFileChecksum).toEqual(expectedFileChecksum);
})