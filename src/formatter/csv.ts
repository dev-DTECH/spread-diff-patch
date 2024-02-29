import Papa from "papaparse";
import Formatter from "."

type DiffAOA = (string | (string | null)[])[][]

export class CSV extends Formatter<string> {
    // constructor(patcher = (actual: string | null, expected: string | null) => {return `[-][${actual}] [+][${expected}]`}) {
    //     super(patcher);
    // }
    // patch(diff: (string | null)[]): string {
    //     let patched = ""
    //     if (diff[0])
    //         patched += this.actualPatcher(diff[0].toString())
    //     if (diff[0] && diff[1])
    //         patched += this.separator
    //     if (diff[1])
    //         patched += this.expectedPatcher(diff[1].toString())
    //     return patched
    // }
    format(diffAOA: DiffAOA): string {
        const patchedAOA = diffAOA.map((row) => {
            return row.map((cell) => Array.isArray(cell) ? this.patch(cell[0],cell[1]) : cell)
        })
        return Papa.unparse(patchedAOA);
    }
}