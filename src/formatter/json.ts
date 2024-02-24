/* eslint-disable @typescript-eslint/no-unused-vars */
import Formatter from "."

type DiffAOA = (string | (string | null)[])[][]

export class JSON extends Formatter<string> {
    constructor(actualPatcher = (actual: string) => `[-][${actual}]`, expectedPatcher = (expected: string) => `[+][${expected}]`, separator = " ") {
        super(actualPatcher, expectedPatcher, separator);
        this.actualPatcher = actualPatcher;
        this.expectedPatcher = expectedPatcher;
        this.separator = separator;
    }
    patch(diff: (string | null)[]): string {
        // TODO: Implement JSON patching
        return "Patched JSON"
    }
    format(diffAOA: DiffAOA): string {
        // TODO: Implement JSON formatting
        return "Formatted JSON"
    }
}