/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * A class responsible for formatting and patching differences in arrays of arrays (AOA).
 * @template T - The type of data in the arrays of arrays.
 */
export default class Formatter<T> {
    // actualPatcher: (actual: string) => string;
    // expectedPatcher: (expected: string) => string;
    // separator: string;
    patch: (actual: string | null, expected: string | null) => string
    /**
     * Creates a new instance of the Formatter class.
     * @param actualPatcher - A function to format the actual value in differences (default is `[-][actual]`).
     * @param expectedPatcher - A function to format the expected value in differences (default is `[+][expected]`).
     * @param separator - The string used to separate values in the formatted output (default is a single space).
     */
    constructor(
        patcher = (actual: string | null, expected: string | null) => {
            let patchedString = ""
            if (actual)
                patchedString += `[-][${actual}]`
            if (actual && expected)
                patchedString += " "
            if (expected)
                patchedString += `[+][${expected}]`
            return patchedString
        }
    ) {
        this.patch = patcher
    }

    /**
     * Formats the differences in the array of arrays using this formatter.
     * @param diffAOA - The array of arrays representing differences.
     * @returns The formatted string representing the differences.
     */
    format(diffAOA: T[][]): string {
        return "Default Formatter";
    }

    // /**
    //  * Generates a patched string for a single difference in the array of arrays.
    //  * @param diff - An array representing a single difference (including null values).
    //  * @returns The patched string for the given difference.
    //  */
    // patch(diff: (T | null)[]): string {
    //     return "Default Patcher";
    // }
}