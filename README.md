# spread-diff-patch

<!--- badges -->

<!-- [![Build Status](https://secure.travis-ci.org/benjamine/jsondiffpatch.svg)](http://travis-ci.org/benjamine/jsondiffpatch) -->
[![Build Status](https://github.com/dev-DTECH/spread-diff-patch/actions/workflows/node.js.yml/badge.svg)](https://github.com/dev-DTECH/spread-diff-patch/actions/workflows/node.js.yml)

## Overview

`spread-diff-patch` is a powerful npm package designed to simplify the process of differencing and patching spreadsheet files. It offers comprehensive functionality for comparing various spreadsheet formats, such as CSV and Workbooks (e.g., Excel files), and generating detailed patch files to highlight the differences between them.

### Key Features

- **CSV Comparison:** Seamlessly compare CSV files or similar tabular data formats, making it easy to identify discrepancies between datasets.

- **Workbook Differencing:** Effortlessly analyze differences between Workbook files, enabling efficient tracking of changes in Excel and other spreadsheet formats.

- **Patch Generation:** Generate patch files that succinctly represent the variations between two spreadsheet files, providing a clear overview of modifications made to the data.

- **Multiple Format Support:** Support for a variety of spreadsheet formats, including CSV, Excel, and others, making it versatile for different use cases.

### Use Cases

- **Data Validation:** Quickly validate and verify the accuracy of financial, scientific, or any other tabular data by identifying discrepancies between expected and actual datasets.

- **Change Tracking:** Facilitate efficient change tracking in collaborative spreadsheet environments, aiding teams in understanding modifications made to shared documents.

- **Automated Testing:** Integrate spreadsheet comparison into automated testing workflows, ensuring data consistency across different versions of datasets.

## Installation

To install `spread-diff-patch` using npm, run the following command:

```bash
npm install spread-diff-patch
```

## Usage

### Importing the Module

```typescript
import { readCSV, diff, readWorkBook, diffWorkBook } from 'spread-diff-patch';
import { CSV } from 'spread-diff-patch/lib/formatter/csv';
import { WorkbookFormatter } from 'spread-diff-patch/lib/formatter/workbook';
```

## Example Usage

```typescript
import { readCSV, diff, readWorkBook, diffWorkBook } from 'spread-diff-patch';
import { CSV } from 'spread-diff-patch/lib/formatter/csv';
import { WorkbookFormatter } from 'spread-diff-patch/lib/formatter/workbook';

// CSV Example
const actualAOA = readCSV<string>("actual.csv");
const expectedAOA = readCSV<string>("expected.csv");
const diffAOA = diff<string>(actualAOA, expectedAOA);
const csv = diffAOA.format(new CSV());
fs.writeFileSync("diff.csv", csv);

// Workbook Example
const actualWorkBook = readWorkBook("actual.xlsx");
const expectedWorkBook = readWorkBook("expected.xlsx");
const diffWB = diffWorkBook(actualWorkBook, expectedWorkBook);
const workbook = diffWB.format(new WorkbookFormatter());
fs.writeFileSync("diff.xlsx", workbook);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Documentation

- [API Documentation](API.md)
- [Contributing Guidelines](CONTRIBUTING.md)