import Papa from "papaparse";
import Formatter from "."

type DiffAOA = (string | (string | null)[])[][]

/**
 * Represents a CSV formatter that converts a DiffAOA (Array of Arrays) into a CSV string.
 */
export class CSV extends Formatter<string> {
    /**
     * Formats the given DiffAOA into a CSV string.
     * @param diffAOA - The DiffAOA to be formatted.
     * @returns The formatted CSV string.
     */
    format(diffAOA: DiffAOA): string {
        const patchedAOA = diffAOA.map((row) => {
            return row.map((cell) => Array.isArray(cell) ? this.patch(cell[0],cell[1]) : cell)
        })
        return Papa.unparse(patchedAOA);
    }
}