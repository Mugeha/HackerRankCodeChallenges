'use strict';

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
 * Complete the 'separateNumbers' function below.
 *
 * The function accepts STRING s as parameter.
 */

function separateNumbers(s) {
    const n = s.length;

    // Try each possible length of the first number (up to half of s)
    for (let len = 1; len <= Math.floor(n / 2); len++) {
        let first = s.substring(0, len);

        // Skip if number has leading zero
        if (first.startsWith('0')) continue;

        let num = BigInt(first); // use BigInt for large numbers
        let built = first;

        // Build sequence until it's at least as long as s
        while (built.length < n) {
            num++;
            built += num.toString();
        }

        // Check if matches original string
        if (built === s) {
            console.log(`YES ${first}`);
            return;
        }
    }

    // If no valid sequence found
    console.log("NO");
}


function main() {
    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        separateNumbers(s);
    }
}
