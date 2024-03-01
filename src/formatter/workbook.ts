import { WorkBook, utils } from "xlsx";
import DiffAOA from "../DIffAOA";

export class WorkbookFormatter<T> {
    patch: (actual: T | null, expected: T | null) => string
    constructor(
        patcher = (actual: T | null, expected: T | null) => {
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
    format(diffSheets: { [sheet: string]: DiffAOA<T> }): WorkBook {
        const diffWorkBook = utils.book_new()
        for (const sheet in diffSheets) {
            const patchedAOA = diffSheets[sheet].map((row) => {
                return row.map((cell) => Array.isArray(cell) ? this.patch(cell[0], cell[1]) : cell)
            })
            const ws = utils.aoa_to_sheet(patchedAOA)
            utils.book_append_sheet(diffWorkBook, ws, sheet)
        }
        return diffWorkBook
    }
}
