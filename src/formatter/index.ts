/* eslint-disable @typescript-eslint/no-unused-vars */

import DiffAOA from "../DeltaAOA"

/**
 * Represents a Formatter class.
 * @template T - The type parameter for the Formatter class.
 */
export default class Formatter<T> {
    patch: (actual: string | null, expected: string | null) => string

    /**
     * Creates an instance of Formatter.
     * @param {Function} patcher - The patcher function used to generate the patched string.
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
     * Formats the diff array of arrays.
     * @param diffAOA - The diff array of arrays to be formatted.
     * @returns The formatted string.
     */
    format(diffAOA: DiffAOA<T>): string {
        throw new Error("Method not implemented.");
    }
}