import Formatter from "./formatter";

/**
 * Represents the differences between two arrays of arrays (AOA) with a customizable format.
 * @template T - The type of data in the arrays of arrays.
 */
class DiffAOA<T> extends Array<Array<T | Array<T | null>>> {
    #diffCount: number = 0;

    /**
     * Formats the differences using the provided formatter.
     * @param formatter - The formatter object responsible for generating the formatted string.
     * @returns The formatted string representing the differences.
     */
    format(formatter: Formatter<T>): string {
        return formatter.format(this as T[][]);
    }

    /**
     * Gets the count of differences in the array of arrays.
     * @returns The number of differences.
     */
    get diffCount() {
        return this.#diffCount;
    }

    /**
     * Sets the count of differences in the array of arrays.
     * @param value - The number of differences to set.
     */
    set diffCount(value: number) {
        this.#diffCount = value;
    }
}

export default DiffAOA;