'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'gridChallenge' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function gridChallenge(grid) {
    // Step 1: Sort each row alphabetically
    // We split each string into chars, sort them, then join back to a string.
    for (let i = 0; i < grid.length; i++) {
        grid[i] = grid[i].split("").sort().join("");
    }

    // Step 2: Check if each column is sorted top-to-bottom
    // Loop through every column index
    for (let col = 0; col < grid[0].length; col++) {
        // Compare each element in the column with the one above it
        for (let row = 1; row < grid.length; row++) {
            // If the current char is less than the char above, it's not sorted
            if (grid[row][col] < grid[row - 1][col]) {
                return "NO";
            }
        }
    }

    // If all columns are sorted, return YES
    return "YES";
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        let grid = [];

        for (let i = 0; i < n; i++) {
            const gridItem = readLine();
            grid.push(gridItem);
        }

        const result = gridChallenge(grid);

        ws.write(result + '\n');
    }

    ws.end();
}
