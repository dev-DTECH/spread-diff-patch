/* eslint-disable @typescript-eslint/no-unused-vars */
import Formatter from "."
type DiffAOA = (string | (string | null)[])[][]
type DiffCellAOA=(string|null)

export default class HTML extends Formatter<string> {
    format(diffAOA: DiffAOA): string {
        let baseHTMLContent:string=`<table style="border-collapse: collapse;" class="diff-of-data">`;
        diffAOA.forEach((row)=>{
            baseHTMLContent+=`<tr>`
            row.forEach((cell)=>{
                if(typeof cell===`string`){
                    baseHTMLContent+=`<td style="border: 1px solid black; padding: 8px;" class="no-diff-string"><p style="background:#d0dfff;">${cell}</p></td>`
                }else{
                    baseHTMLContent+=this.patchFormat(cell[0],cell[1])
                }
            
            })
            baseHTMLContent+=`</tr>`
        })
        baseHTMLContent+=`</table>`
        return baseHTMLContent
        // // TODO: Implement HTML formatting
        // throw new Error("Method not implemented.");
    }

    patchFormat(actual:DiffCellAOA,expected:DiffCellAOA):string{
      
            if(actual&&expected){
                return `<td style="border: 1px solid black; padding: 8px;"><div class="actual-expected-diff" style="display: flex; flex-direction: row;"><p class="actual-data" style="margin-right:5px; background:#ffbbbb;"><s>${actual}</s></p><p class="expected-data" style="background:#bbffbb;">${expected}</p></div></td>`
            }else if(expected){
                return `<td style="border: 1px solid black; padding: 8px;"><p class="no-actual-but-expected" style="background:#bbffbb;">${expected}</p></td>`
            }else if(actual) {
                return `<td style="border: 1px solid black; padding: 8px;"><p class="no-expected-but-actual" style="background:#ffbbbb;"><s>${actual}</s></p></td>`
            }else{
                return `<td style="border: 1px solid black; padding: 8px;"></td>`;
            }
        
    }
}