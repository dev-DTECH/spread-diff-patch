import fs from 'fs';
import crypto from 'crypto';
import { diff, diffWorkBook, readCSV, readWorkBook } from '../src';
import { CSV } from '../src/formatter/csv';
import { WorkbookFormatter } from '../src/formatter/workbook';
import { writeFile } from 'xlsx';
import testData from './data/test.data.json';

test('Write delta CSV', () => {
    const actualFilePath = "tests/data/actual-financial-data.csv"
    const expectedFilePath = "tests/data/expected-financial-data.csv"
    const actualAOA = readCSV<string>(actualFilePath)
    const expectedAOA = readCSV<string>(expectedFilePath)
    const diffAOA = diff<string>(actualAOA, expectedAOA)
    const csv = diffAOA.format(new CSV())
    fs.mkdirSync("tests/delta", { recursive: true })
    fs.writeFileSync("tests/delta/diff-financial-data.csv", csv)
    const actualFileChecksum = crypto.createHash('sha256').update(fs.readFileSync('tests/delta/diff-financial-data.csv')).digest('hex');

    expect(actualFileChecksum).toEqual(testData.expectedCSVFileChecksum);
})

test('Write delta XLSX', () => {
    const actualFilePath = "tests/data/actual-file_example.xlsx"
    const expectedFilePath = "tests/data/expected-file_example.xlsx"
    const actualWorkBook = readWorkBook(actualFilePath)
    const expectedWorkBook = readWorkBook(expectedFilePath)
    const diff = diffWorkBook(actualWorkBook, expectedWorkBook)
    const workbook = diff.format(new WorkbookFormatter())
    fs.mkdirSync("tests/delta", { recursive: true })
    writeFile(workbook, "tests/delta/diff-file_example.xlsx")
    const actualFileChecksum = crypto.createHash('sha256').update(fs.readFileSync('tests/delta/diff-file_example.xlsx')).digest('hex');

    expect(actualFileChecksum).toEqual(testData.expectedXLSXFileChecksum);
})