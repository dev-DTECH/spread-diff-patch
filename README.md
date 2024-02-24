# Spread Diff Patch

## Overview

`spread-diff-patch` is an npm package that provides functionality for comparing and formatting differences between two arrays of arrays (AOA). It includes a customizable formatter to generate formatted output based on the identified differences.

## Installation

To install the package, use the following npm command:

```bash
npm install spread-diff-patch
```

## Usage

### Basic Usage

```typescript
import { readCSV, diff } from 'spread-diff-patch';

const actualFilePath = "tests/data/actual-financial-data.csv";
const expectedFilePath = "tests/data/expected-financial-data.csv";

// Read CSV files into arrays of arrays
const actualAOA = readCSV<string>(actualFilePath);
const expectedAOA = readCSV<string>(expectedFilePath);

// Calculate differences and obtain a DiffAOA instance
const diffAOA = diff<string>(actualAOA, expectedAOA);

// Access the count of differences
console.log("Number of differences:", diffAOA.diffCount);
```

### Write Delta CSV

```typescript
import { readCSV, diff } from 'spread-diff-patch';
import { CSV } from 'spread-diff-patch/lib/formatter/csv'; // User "csv.js" for JS

const actualFilePath = "tests/data/actual-financial-data.csv";
const expectedFilePath = "tests/data/expected-financial-data.csv";

// Read CSV files into arrays of arrays
const actualAOA = readCSV<string>(actualFilePath);
const expectedAOA = readCSV<string>(expectedFilePath);

// Calculate differences and obtain a DiffAOA instance
const diffAOA = diff<string>(actualAOA, expectedAOA);

// Format differences as CSV and write to a file
const csv = diffAOA.format(new CSV());
fs.writeFileSync("tests/delta/diff-financial-data.csv", csv);
```

## Formatters

- [x] CSV Formatter
- [ ] HTML Formatter
- [ ] JSON Formatter

## Examples

To run the provided examples, execute the following commands:

```bash
npm test
```

## License

This package is licensed under the [MIT License](LICENSE).

---