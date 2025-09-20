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
 * Complete the 'dynamicArray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n   -> number of empty arrays (toy boxes)
 *  2. 2D_INTEGER_ARRAY queries -> list of instructions
 */

function dynamicArray(n, queries) {
  // Step 1: Make n empty "boxes"
  let arr = Array.from({ length: n }, () => []);

  // Step 2: lastAnswer starts at 0
  let lastAnswer = 0;

  // This will hold all answers from Type 2 queries
  let answers = [];

  // Step 3: Process each query
  for (let [type, x, y] of queries) {
    let idx = (x ^ lastAnswer) % n; // figure out which box to use

    if (type === 1) {
      // Type 1 -> put y inside the box
      arr[idx].push(y);
    } else if (type === 2) {
      // Type 2 -> fetch the value
      let value = arr[idx][y % arr[idx].length];
      lastAnswer = value;
      answers.push(lastAnswer); // save the result
    }
  }

  // Step 4: Return all answers collected from Type 2 queries
  return answers;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

  const n = parseInt(firstMultipleInput[0], 10);
  const q = parseInt(firstMultipleInput[1], 10);

  let queries = Array(q);

  for (let i = 0; i < q; i++) {
    queries[i] = readLine()
      .replace(/\s+$/g, '')
      .split(' ')
      .map((queriesTemp) => parseInt(queriesTemp, 10));
  }

  const result = dynamicArray(n, queries);

  ws.write(result.join('\n') + '\n');

  ws.end();
}
