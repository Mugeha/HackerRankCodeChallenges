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
 * Complete the 'maximumPerimeterTriangle' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY sticks as parameter.
 */

function maximumPerimeterTriangle(sticks) {
    // Sort sticks in ascending order
    sticks.sort((a, b) => a - b);

    // Start from the largest possible triplet
    for (let i = sticks.length - 3; i >= 0; i--) {
        const a = sticks[i];
        const b = sticks[i + 1];
        const c = sticks[i + 2];

        // Check triangle inequality
        if (a + b > c) {
            return [a, b, c]; // Valid triangle found
        }
    }

    // If no triangle can be formed
    return [-1];
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const sticks = readLine().replace(/\s+$/g, '').split(' ').map(sticksTemp => parseInt(sticksTemp, 10));

    const result = maximumPerimeterTriangle(sticks);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
