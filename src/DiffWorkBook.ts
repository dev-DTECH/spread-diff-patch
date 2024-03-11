import DiffAOA from "./DeltaAOA";
import { WorkbookFormatter } from "./formatter/workbook";
/**
 * Represents a workbook that stores the differences between two workbooks.
 * @template T - The type of data stored in the workbook.
 */
class DiffWorkBook<T> {
    sheets: { [sheet: string]: DiffAOA<T>; };
    #diffCount: number = 0;

    constructor() {
        this.sheets = {};
    }

    /**
     * Formats the workbook using the specified formatter.
     * @param formatter - The formatter to use for formatting the workbook.
     * @returns The formatted workbook.
     */
    format(formatter: WorkbookFormatter<T>) {
        return formatter.format(this.sheets);
    }

    /**
     * Gets the number of differences in the workbook.
     */
    get diffCount() {
        return this.#diffCount;
    }

    /**
     * Sets the number of differences in the workbook.
     */
    set diffCount(value: number) {
        this.#diffCount = value;
    }
}

export default DiffWorkBook;