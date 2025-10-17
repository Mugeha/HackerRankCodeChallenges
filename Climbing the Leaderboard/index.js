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
 * Complete the 'climbingLeaderboard' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY ranked
 *  2. INTEGER_ARRAY player
 */

function climbingLeaderboard(ranked, player) {
    // Step 1: Remove duplicate scores from the ranked list (since equal scores share ranks)
    let uniqueRanked = [];
    for (let score of ranked) {
        if (uniqueRanked.length === 0 || uniqueRanked[uniqueRanked.length - 1] !== score) {
            uniqueRanked.push(score);
        }
    }

    // Step 2: Initialize an empty array for results and a pointer at the end of uniqueRanked
    let result = [];
    let i = uniqueRanked.length - 1;

    // Step 3: For each player score, determine their rank
    for (let pScore of player) {
        // Move the pointer left while player score >= current leaderboard score
        while (i >= 0 && pScore >= uniqueRanked[i]) {
            i--;
        }
        // Rank is index + 2 because:
        // - index is 0-based
        // - rank starts at 1
        // - if player beats all scores (i < 0), rank should be 1
        result.push(i + 2);
    }

    return result;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const rankedCount = parseInt(readLine().trim(), 10);

    const ranked = readLine().replace(/\s+$/g, '').split(' ').map(rankedTemp => parseInt(rankedTemp, 10));

    const playerCount = parseInt(readLine().trim(), 10);

    const player = readLine().replace(/\s+$/g, '').split(' ').map(playerTemp => parseInt(playerTemp, 10));

    const result = climbingLeaderboard(ranked, player);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
