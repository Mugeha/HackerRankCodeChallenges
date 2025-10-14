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
 * Complete the 'minimumBribes' function below.
 *
 * The function accepts INTEGER_ARRAY q as parameter.
 */

function minimumBribes(q) {
    let bribes = 0;

    // Loop through each person in the queue
    for (let i = 0; i < q.length; i++) {
        // The sticker number shows their original position (1-indexed)
        const originalPos = q[i];
        const currentPos = i + 1;

        // If someone moved more than 2 places ahead, it's chaos
        if (originalPos - currentPos > 2) {
            console.log("Too chaotic");
            return;
        }

        // Count how many people with a higher sticker number are ahead of them
        // Start from two places behind their original position (optimization!)
        for (let j = Math.max(0, originalPos - 2); j < i; j++) {
            if (q[j] > originalPos) {
                bribes++;
            }
        }
    }

    console.log(bribes);
}


function main() {
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const q = readLine().replace(/\s+$/g, '').split(' ').map(qTemp => parseInt(qTemp, 10));

        minimumBribes(q);
    }
}
