'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'bomberMan' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. STRING_ARRAY grid
 */

function bomberMan(n, grid) {
    // If it's the first second, just return the original grid
    if (n === 1) return grid;

    // If n is even, grid is completely full of bombs
    if (n % 2 === 0) {
        return grid.map(row => 'O'.repeat(row.length));
    }

    // Function to simulate an explosion
    const detonate = (inputGrid) => {
        const rows = inputGrid.length;
        const cols = inputGrid[0].length;

        // Create full grid of bombs initially
        const fullGrid = Array.from({ length: rows }, () => Array(cols).fill('O'));

        // Directions for up, down, left, right
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

        // Loop through each cell
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (inputGrid[r][c] === 'O') {
                    // Bomb detonates: clear itself and its neighbors
                    fullGrid[r][c] = '.';
                    for (let [dr, dc] of directions) {
                        const nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                            fullGrid[nr][nc] = '.';
                        }
                    }
                }
            }
        }

        // Convert back to array of strings
        return fullGrid.map(row => row.join(''));
    };

    // After t=3, the grid looks like first detonation
    const firstDetonation = detonate(grid);

    // After t=5, the grid looks like the detonation of the firstDetonation
    const secondDetonation = detonate(firstDetonation);

    // Depending on time, return the correct repeating pattern
    if (n % 4 === 3) return firstDetonation;
    return secondDetonation;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const r = parseInt(firstMultipleInput[0], 10);
    const c = parseInt(firstMultipleInput[1], 10);
    const n = parseInt(firstMultipleInput[2], 10);

    let grid = [];

    for (let i = 0; i < r; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const result = bomberMan(n, grid);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
