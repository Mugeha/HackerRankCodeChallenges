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
 * Complete the 'migratoryBirds' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function migratoryBirds(arr) {
    const count = {};

    // Count how many times each bird id appears
    for (let bird of arr) {
        count[bird] = (count[bird] || 0) + 1;
    }

    let maxCount = 0;
    let result = Number.MAX_SAFE_INTEGER;

    // Find the bird id with the highest count
    for (let bird in count) {
        const birdId = parseInt(bird);
        // Update result if this bird has a higher count
        // or same count but smaller id
        if (count[bird] > maxCount || (count[bird] === maxCount && birdId < result)) {
            maxCount = count[bird];
            result = birdId;
        }
    }

    return result;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = migratoryBirds(arr);

    ws.write(result + '\n');

    ws.end();
}
