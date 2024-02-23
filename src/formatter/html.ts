/* eslint-disable @typescript-eslint/no-unused-vars */
import Formatter from "."

type DiffAOA = (string | (string | null)[])[][]

export class CSV extends Formatter<string> {
    constructor(actualPatcher = (actual: string) => `[-][${actual}]`, expectedPatcher = (expected: string) => `[+][${expected}]`, separator = " ") {
        super(actualPatcher, expectedPatcher, separator);
        this.actualPatcher = actualPatcher;
        this.expectedPatcher = expectedPatcher;
        this.separator = separator;
    }
    patch(diff: (string | null)[]): string {
        // TODO: Implement HTML patching
        return "Patched HTML"
    }
    format(diffAOA: DiffAOA): string {
        // TODO: Implement HTML formatting
        return "Formatted HTML"
    }
}