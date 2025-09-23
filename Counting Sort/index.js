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
 * Complete the 'countSort' function below.
 *
 * The function accepts 2D_STRING_ARRAY arr as parameter.
 */

function countSort(arr) {
    const n = arr.length;
    const buckets = [];

    // Initialize buckets based on the max key
    for (let i = 0; i < 100; i++) {
        buckets.push([]);
    }

    for (let i = 0; i < n; i++) {
        const index = parseInt(arr[i][0], 10); // key as integer
        let value = arr[i][1];

        // Replace with dash if in first half
        if (i < n / 2) {
            value = "-";
        }

        buckets[index].push(value);
    }

    // Flatten buckets in order
    const result = [];
    for (let bucket of buckets) {
        for (let str of bucket) {
            result.push(str);
        }
    }

    console.log(result.join(" "));
}


function main() {
    const n = parseInt(readLine().trim(), 10);

    let arr = Array(n);

    for (let i = 0; i < n; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ');
    }

    countSort(arr);
}
