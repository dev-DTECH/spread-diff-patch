import Papa from "papaparse";
import fs from 'fs';
import DiffAOA from "./DIffAOA";

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
    let diffCount = 0;
    const diffAOA: DiffAOA<T> = new DiffAOA();
    const maxRowCount = Math.max(actualAOA.length, expectedAOA.length);

    for (let i = 0; i < maxRowCount; i += 1) {
        const diffRow: (T | (T | null)[])[] = [];
        const maxColCount = Math.max(actualAOA?.[i]?.length || 0, expectedAOA?.[i]?.length || 0);

        for (let j = 0; j < maxColCount; j += 1) {
            if (comparator(actualAOA?.[i]?.[j], expectedAOA?.[i]?.[j])) {
                diffCount += 1;
                diffRow[j] = [actualAOA?.[i]?.[j], expectedAOA?.[i]?.[j]];
            } else {
                diffRow[j] = expectedAOA?.[i]?.[j];
            }
        }

        diffAOA.push(diffRow);
    }

    diffAOA.diffCount = diffCount;
    return diffAOA;
}