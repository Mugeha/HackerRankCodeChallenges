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
 * Complete the 'palindromeIndex' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function palindromeIndex(s) {
    // --- Helper function: checks if a substring is a palindrome ---
    const isPalindrome = (str, left, right) => {
        // Compare characters from both ends moving inward
        while (left < right) {
            if (str[left] !== str[right]) return false; // mismatch found
            left++;
            right--;
        }
        return true; // all characters matched
    };

    let left = 0;
    let right = s.length - 1;

    // --- Step 1: Use two pointers to check if string is already a palindrome ---
    while (left < right) {
        if (s[left] !== s[right]) {
            // --- Step 2: Found a mismatch ---
            // Try removing one character from either side and check if it fixes it
            
            // Case 1: Remove character at `left` and check the rest
            if (isPalindrome(s, left + 1, right)) {
                return left; // Removing left char makes it a palindrome
            }
            // Case 2: Remove character at `right` and check the rest
            else if (isPalindrome(s, left, right - 1)) {
                return right; // Removing right char makes it a palindrome
            } else {
                // Neither removal helps => not fixable by one removal
                return -1;
            }
        }
        left++;
        right--;
    }

    // --- Step 3: If loop finishes, string was already a palindrome ---
    return -1;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = palindromeIndex(s);

        ws.write(result + '\n');
    }

    ws.end();
}
