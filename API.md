
### API.md

# spread-diff-patch API

## Table of Contents

- [spread-diff-patch API](#spread-diff-patch-api)
  - [Table of Contents](#table-of-contents)
    - [`readCSV<T>(filePath: string): T[][]`](#readcsvtfilepath-string-t)
      - [Parameters](#parameters)
      - [Returns](#returns)
    - [`readWorkBook(filePath: string): any`](#readworkbookfilepath-string-any)
      - [Parameters](#parameters-1)
      - [Returns](#returns-1)
    - [`diff<T>(actual: T[][], expected: T[][]): DiffAOA<T>`](#difftactual-t-expected-t-diffaoat)
      - [Parameters](#parameters-2)
      - [Returns](#returns-2)
    - [`diffWorkBook(actual: WorkBook, expected: WorkBook): DiffWorkBook`](#diffworkbookactual-workbook-expected-workbook-diffworkbook)
      - [Parameters](#parameters-3)
      - [Returns](#returns-3)
    - [`DiffWorkBook`](#diffworkbook)
      - [Methods](#methods)
    - [Formatters](#formatters)
      - [CSV](#csv)
      - [Workbook](#workbook)

### `readCSV<T>(filePath: string): T[][]`

- Reads a CSV file and returns an array of arrays containing the data.

#### Parameters

- `filePath` (string): The path to the CSV file.

#### Returns

- `T[][]`: An array of arrays representing the CSV data.

### `readWorkBook(filePath: string): any`

- Reads a Workbook file and returns the workbook data.

#### Parameters

- `filePath` (string): The path to the Workbook file.

#### Returns

- `any`: The workbook data.

### `diff<T>(actual: T[][], expected: T[][]): DiffAOA<T>`

- Calculates the differences between two arrays of arrays and returns a `DiffAOA` instance.

#### Parameters

- `actual` (T[][]): The actual data array.
- `expected` (T[][]): The expected data array.

#### Returns

- `DiffAOA<T>`: An instance of `DiffAOA` representing the differences between the two arrays.

### `diffWorkBook(actual: WorkBook, expected: WorkBook): DiffWorkBook`

- Calculates the differences between two Workbook files and returns a `DiffWorkBook` instance.

#### Parameters

- `actual` (WorkBook): The actual workbook data.
- `expected` (WorkBook): The expected workbook data.

#### Returns

- `DiffWorkBook`: An instance of `DiffWorkBook` representing the differences between the two workbooks.

### `DiffWorkBook`

- Represents the differences between two Workbook files.

#### Methods

- `format(formatter: Formatter<any>): any`: Formats the differences using a specified formatter.

### Formatters

#### CSV

- `CSV`: A formatter class specifically designed for CSV output.

#### Workbook

- `WorkbookFormatter`: A formatter class specifically designed for Workbook (e.g., Excel) output.



