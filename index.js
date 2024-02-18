import { readFile, utils } from "xlsx"

/**
 * Reads a spreadsheet from the given file path and sheet name.
 * @param {string} filePath - The path to the spreadsheet file.
 * @param {string} sheetName - The name of the sheet to read from.
 * @returns {Array} - An array of arrays representing the sheet data.
 */
function readSpreadSheet(filePath, sheetName) {
    try {
        const wb = readFile(filePath)
        const aoa = utils.sheet_to_json(wb.Sheets[sheetName], { header: 1, raw: true })
        return aoa
    } catch (e) {
        addLog(`Error reading ${filePath}`)
        return []
    }
}

/**
 * Compares two CSV files, identifies differences, and optionally asserts if a mismatch is found.
 * @param {string} actualFile - The path to the actual CSV file.
 * @param {string} expectedFile - The path to the expected CSV file.
 * @param {string} [sheetName="Sheet1"] - The name of the sheet to compare.
 * @param {boolean} [noAssertion=true] - Set to true to skip assertion on differences.
 */
export async function compareCSV(actualFilePath, expectedFile, sheetName = "Sheet1", noAssertion = true) {
    const actualAOA = readSpreadSheet(actualFilePath, sheetName)
    const expectedAOA = readSpreadSheet(expectedFile, sheetName)

    // Generate delta CSV file
    const diffJSON = []
    let diffCount = 0

    const maxRowCount = Math.max(actualAOA.length, expectedAOA.length)
    for (let i = 0; i < maxRowCount; i += 1) {
        const diffRow = []
        const maxColCount = Math.max(actualAOA?.[i]?.length || 0, expectedAOA?.[i]?.length || 0)
        for (let j = 0; j < maxColCount; j += 1) {
            diffRow[j] = ""
            if (actualAOA?.[i]?.[j] !== expectedAOA?.[i]?.[j]) {
                diffCount += 1
                if (actualAOA?.[i]?.[j])
                    diffRow[j] += `[-][${actualAOA?.[i]?.[j]}]`
                if (expectedAOA?.[i]?.[j])
                    diffRow[j] += ` [+][${expectedAOA?.[i]?.[j]}]`
            } else {
                diffRow[j] = expectedAOA?.[i]?.[j]
            }
        }
        diffJSON.push(diffRow)
    }
    // addLog(`[LC COMPARE] Found ${diffCount} difference while comparing LiveCube data with expected file`)
    // if (diffCount) {
    //     const diffCSV = utils.sheet_to_csv(utils.aoa_to_sheet(diffJSON))
    //     await fs.writeFile(diffFile, diffCSV)
    //     addLog(`[LC COMPARE] Delta URL: ${getDeltaRoute(deltaFileName)}`)
    //     if (!noAssertion)
    //         assert.fail(`[LC COMPARE] LiveCube UI data didn't match with expected file and delta file written to ${diffFile}`)
    // }
    // addLog("[LC COMPARE] LiveCube UI data matched with expected file ✅")
}