import Papa from "papaparse";
import fs from 'fs';
import DiffAOA from "./DiffAOA";
import xlsx, { WorkBook, utils } from 'xlsx';
import DiffWorkBook from "./DiffWorkBook";

/**
 * Reads a CSV file and parses its content into a two-dimensional array.
 * @param filePath - The path to the CSV file.
 * @returns A two-dimensional array representing the parsed CSV data.
 * @template T - The type of data in the CSV file.
 */
export function readCSV<T>(filePath: string): T[][] {
    return Papa.parse<T[]>(fs.readFileSync(filePath, "utf8")).data || [];
}
/**
 * Reads a workbook from the specified file path.
 * @param filePath - The path to the workbook file.
 * @returns The parsed workbook object.
 */
export function readWorkBook(filePath: string) {
    return xlsx.readFile(filePath)
}

/**
 * Compares two arrays of arrays (AOA) and identifies differences based on a custom comparator function.
 * @param actualAOA - The actual array of arrays.
 * @param expectedAOA - The expected array of arrays for comparison.
 * @param comparator - A function to compare individual elements in the arrays (default is a simple !== comparison).
 * @returns An instance of DiffAOA<T> representing the differences between the two arrays of arrays.
 * @template T - The type of data in the arrays of arrays.
 */
export function diff<T>(
    actualAOA: T[][],
    expectedAOA: T[][],
    comparator: (actual: T, expected: T) => boolean = (actual, expected) => actual !== expected
): DiffAOA<T> {
    const diffAOA: DiffAOA<T> = new DiffAOA();
    const maxRowCount = Math.max(actualAOA.length, expectedAOA.length);

    for (let i = 0; i < maxRowCount; i += 1) {
        const diffRow: (T | (T | null)[])[] = [];
        const maxColCount = Math.max(actualAOA?.[i]?.length || 0, expectedAOA?.[i]?.length || 0);

        for (let j = 0; j < maxColCount; j += 1) {
            if (comparator(actualAOA?.[i]?.[j], expectedAOA?.[i]?.[j])) {
                diffAOA.diffCount += 1;
                diffRow[j] = [actualAOA?.[i]?.[j], expectedAOA?.[i]?.[j]];
            } else {
                diffRow[j] = expectedAOA?.[i]?.[j];
            }
        }

        diffAOA.push(diffRow);
    }
    return diffAOA;
}

/**
 * Calculates the difference between two workbooks.
 * @template T - The type of the elements in the workbooks.
 * @param actualWorkBook - The actual workbook.
 * @param expectedWorkBook - The expected workbook.
 * @param comparator - The comparator function to compare elements in the workbooks. Defaults to a function that checks for inequality.
 * @param sheetPatcher - The function to generate a patched string for sheet names. Defaults to a function that generates a string with added and removed sheet names.
 * @returns - The diff workbook containing the differences between the two workbooks.
 */
export function diffWorkBook<T>(
    actualWorkBook: WorkBook,
    expectedWorkBook: WorkBook,
    comparator: (actual: T, expected: T) => boolean = (actual, expected) => actual !== expected,
    sheetPatcher = (actual: string | null, expected: string | null) => {
        let patchedString = ""
        if (actual)
            patchedString += `(-)(${actual})`
        if (expected)
            patchedString += `(+)(${expected})`
        return patchedString
    }
) {
    const diffWorkBook: DiffWorkBook<T> = new DiffWorkBook()
    const actualSheets = actualWorkBook.SheetNames
    const expectedSheets = expectedWorkBook.SheetNames
    const maxSheetCount = Math.max(actualSheets?.length || 0, expectedSheets?.length || 0)
    for (let i = 0; i < maxSheetCount; i += 1) {
        if (comparator(actualSheets?.[i] as T, expectedSheets?.[i] as T)) {
            const actualPatchedSheet = sheetPatcher(actualSheets?.[i],null)
            diffWorkBook.sheets[actualPatchedSheet] = diff<T>(
                utils.sheet_to_json(actualWorkBook.Sheets[actualSheets?.[i]], { header: 1 }),
                [],
                comparator
            )
            diffWorkBook.diffCount += diffWorkBook.sheets[actualPatchedSheet].diffCount
            const expectedPatchedSheet = sheetPatcher(null,expectedSheets?.[i])
            diffWorkBook.sheets[expectedPatchedSheet] = diff<T>(
                [],
                utils.sheet_to_json(expectedWorkBook.Sheets[expectedSheets?.[i]], { header: 1 }),
                comparator
            )
            diffWorkBook.diffCount += diffWorkBook.sheets[expectedPatchedSheet].diffCount
        }
        else {
            diffWorkBook.sheets[expectedSheets[i]] = diff<T>(
                utils.sheet_to_json(actualWorkBook.Sheets[actualSheets?.[i]], { header: 1 }),
                utils.sheet_to_json(expectedWorkBook.Sheets[expectedSheets?.[i]], { header: 1 }),
                comparator
            )
            diffWorkBook.diffCount += diffWorkBook.sheets[expectedSheets[i]].diffCount
        }
    }
    return diffWorkBook
}