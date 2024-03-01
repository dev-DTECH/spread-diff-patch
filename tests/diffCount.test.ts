import { diff, diffWorkBook, readCSV, readWorkBook } from '../src';

test('Calculate AOA diffCount', () => {
    const actualFilePath = "tests/data/actual-financial-data.csv"
    const expectedFilePath = "tests/data/expected-financial-data.csv"
    const actualAOA = readCSV<string>(actualFilePath)
    const expectedAOA = readCSV<string>(expectedFilePath)
    const diffAOA = diff<string>(actualAOA, expectedAOA)
    expect(diffAOA.diffCount).toEqual(21876)
})

test('Calculate WorkBook diffCount', () => {
    const actualFilePath = "tests/data/actual-file_example.xlsx"
    const expectedFilePath = "tests/data/expected-file_example.xlsx"
    const actualWorkBook = readWorkBook(actualFilePath)
    const expectedWorkBook = readWorkBook(expectedFilePath)
    const diff = diffWorkBook(actualWorkBook, expectedWorkBook)
    expect(diff.diffCount).toEqual(7)
})