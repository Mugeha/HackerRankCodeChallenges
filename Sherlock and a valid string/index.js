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
 * Complete the 'isValid' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isValid(s) {
    // Count frequency of each character
    const freq = {};
    for (let char of s) {
        freq[char] = (freq[char] || 0) + 1;
    }

    // Count how many times each frequency appears
    const freqCount = {};
    for (let key in freq) {
        const f = freq[key];
        freqCount[f] = (freqCount[f] || 0) + 1;
    }

    const keys = Object.keys(freqCount).map(Number);

    // Case 1: All characters appear the same number of times
    if (keys.length === 1) {
        return "YES";
    }

    // Case 2: Only two distinct frequencies exist
    if (keys.length === 2) {
        const [f1, f2] = keys;
        const c1 = freqCount[f1];
        const c2 = freqCount[f2];

        // One frequency is 1 and it only occurs once (e.g., "aabbc")
        if ((f1 === 1 && c1 === 1) || (f2 === 1 && c2 === 1)) {
            return "YES";
        }

        // One frequency differs by 1 and appears only once (e.g., "aabbccddd")
        if ((Math.abs(f1 - f2) === 1) && ((c1 === 1) || (c2 === 1))) {
            return "YES";
        }
    }

    return "NO";
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = isValid(s);

    ws.write(result + '\n');

    ws.end();
}
