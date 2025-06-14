const assert = require('assert');
const calculateNumber = require('./0-calcul.js');

describe('calculateNumber(a, b)', function() {
  it('1 + 3 → 4', function() {
    assert.strictEqual(calculateNumber(1, 3), 4);
  });

  it('1 + 3.7 → 5', function() {
    assert.strictEqual(calculateNumber(1, 3.7), 5);
  });

  it('1.2 + 3.7 → 5', function() {
    assert.strictEqual(calculateNumber(1.2, 3.7), 5);
  });

  it('1.5 + 3.7 → 6', function() {
    assert.strictEqual(calculateNumber(1.5, 3.7), 6);
  });

  // edge-case examples around rounding behavior
  it('1.5 + 0.5 → 3 (2 + 1)', function() {
    assert.strictEqual(calculateNumber(1.5, 0.5), 3);
  });

  it('-1.2 + 1.2 → 0', function() {
    assert.strictEqual(calculateNumber(-1.2, 1.2), 0);
  });

  it('0 + 0 → 0', function() {
    assert.strictEqual(calculateNumber(0, 0), 0);
  });
});

