import DiffAOA from "./DIffAOA";
import { WorkbookFormatter } from "./formatter/workbook";

// import Formatter from './formatter';
class DiffWorkBook<T> {
    sheets: { [sheet: string]: DiffAOA<T>; };
    #diffCount: number = 0;
    constructor() {
        this.sheets = {};
    }
    format(formatter: WorkbookFormatter<T>) {
        return formatter.format(this.sheets);
    }
    get diffCount() {
        return this.#diffCount;
    }
    set diffCount(value: number) {
        this.#diffCount = value;
    }
}

export default DiffWorkBook;