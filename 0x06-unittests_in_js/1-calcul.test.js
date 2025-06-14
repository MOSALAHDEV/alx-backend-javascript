const assert = require('assert');
const calculateNumber = require('./1-calcul.js');

describe('calculateNumber(type, a, b)', function() {
  describe('SUM', function() {
    it('1.4 + 4.5 → 6', function() {
      assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
    });
    it('1.5 + 3.7 → 6 (2 + 4)', function() {
      assert.strictEqual(calculateNumber('SUM', 1.5, 3.7), 6);
    });
    it('-1.2 + -1.2 → -2', function() {
      assert.strictEqual(calculateNumber('SUM', -1.2, -1.2), -2);
    });
  });

  describe('SUBTRACT', function() {
    it('1.4 - 4.5 → -4 (1 - 5)', function() {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4);
    });
    it('1.5 - 3.7 → -2 (2 - 4)', function() {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.5, 3.7), -2);
    });
    it('0 - 0.4 → 0 (0 - 0)', function() {
      assert.strictEqual(calculateNumber('SUBTRACT', 0, 0.4), 0);
    });
  });

  describe('DIVIDE', function() {
    it('1.4 / 4.5 → 0.2 (1 / 5)', function() {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
    });
    it('1.2 / 0.5 → 1 (1 / 1)', function() {
      assert.strictEqual(calculateNumber('DIVIDE', 1.2, 0.5), 1);
    });
    it('1.4 / 0 → "Error"', function() {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
    });
  });

  describe('Invalid type', function() {
    it('throws on unknown type', function() {
      assert.throws(() => calculateNumber('MUL', 1, 2), {
        name: 'Error',
        message: 'Unknown type'
      });
    });
  });
});

