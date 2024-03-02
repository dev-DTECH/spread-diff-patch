/* eslint-disable @typescript-eslint/no-unused-vars */
import Formatter from "."

type DiffAOA = (string | (string | null)[])[][]

export class JSON extends Formatter<string> {
    format(diffAOA: DiffAOA): string {
        // TODO: Implement JSON formatting
        throw new Error("Method not implemented.");
    }
}