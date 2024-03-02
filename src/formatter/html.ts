/* eslint-disable @typescript-eslint/no-unused-vars */
import Formatter from "."

type DiffAOA = (string | (string | null)[])[][]

export class HTML extends Formatter<string> {
    format(diffAOA: DiffAOA): string {
        // TODO: Implement HTML formatting
        throw new Error("Method not implemented.");
    }
}