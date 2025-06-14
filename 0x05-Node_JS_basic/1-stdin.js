#!/usr/bin/node
/**
 * 1-stdin.js
 * Prompt for a name, echo it, then on EOF print a closing message.
 */

console.log('Welcome to Holberton School, what is your name?');

let gotName = false;
process.stdin.setEncoding('utf-8');

process.stdin.on('data', (chunk) => {
  if (gotName) {
    return;
  }
  gotName = true;
  const name = chunk.trim();
  console.log(`Your name is: ${name}`);
  if (process.stdin.isTTY) {
    process.exit(0);
  }
});

process.stdin.on('end', () => {
  console.log('This important software is now closing');
});

process.stdin.resume();
