const { spawn } = require('child_process');
const { strictEqual } = require('assert');
const path = require('path');

describe('1-stdin.js', function() {
  it('should prompt, echo the name, and print closing message on piped input', function(done) {
    this.timeout(5000);
    const script = path.join(__dirname, '1-stdin.js');
    const child = spawn('node', [script]);

    let out = '';
    child.stdout.on('data', (chunk) => {
      out += chunk.toString();
    });

    child.on('close', (code) => {
      // Split and remove any trailing empty lines
      const lines = out.trim().split('\n');
      strictEqual(lines[0], 'Welcome to Holberton School, what is your name?');
      strictEqual(lines[1], 'Your name is: John');
      strictEqual(lines[2], 'This important software is now closing');
      done();
    });

    // Simulate piped input
    child.stdin.write('John\n');
    child.stdin.end();
  });
});
