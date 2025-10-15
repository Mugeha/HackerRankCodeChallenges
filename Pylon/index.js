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
 * Complete the 'pylons' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */

function pylons(k, arr) {
    const n = arr.length;
    let i = 0;
    let count = 0;

    while (i < n) {
        let loc = Math.min(i + k - 1, n - 1);
        let found = false;

        while (loc >= i - (k - 1) && loc >= 0) {
            if (arr[loc] === 1) {
                found = true;
                break;
            }
            loc--;
        }

        if (!found) {
            return -1;
        }

        count++;
        i = loc + k;
    }

    return count;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = pylons(k, arr);

    ws.write(result + '\n');

    ws.end();
}
