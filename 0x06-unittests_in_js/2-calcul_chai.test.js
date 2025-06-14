const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai.js');

describe('calculateNumber(type, a, b) with Chai', function() {
  describe('SUM', function() {
    it('should return 6 for SUM(1.4, 4.5)', function() {
      expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
    });
    it('should return 6 for SUM(1.5, 3.7)', function() {
      expect(calculateNumber('SUM', 1.5, 3.7)).to.equal(6);
    });
    it('should return -2 for SUM(-1.2, -1.2)', function() {
      expect(calculateNumber('SUM', -1.2, -1.2)).to.equal(-2);
    });
  });

  describe('SUBTRACT', function() {
    it('should return -4 for SUBTRACT(1.4, 4.5)', function() {
      expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
    });
    it('should return -2 for SUBTRACT(1.5, 3.7)', function() {
      expect(calculateNumber('SUBTRACT', 1.5, 3.7)).to.equal(-2);
    });
    it('should return 0 for SUBTRACT(0, 0.4)', function() {
      expect(calculateNumber('SUBTRACT', 0, 0.4)).to.equal(0);
    });
  });

  describe('DIVIDE', function() {
    it('should return 0.2 for DIVIDE(1.4, 4.5)', function() {
      expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
    });
    it('should return 1 for DIVIDE(1.2, 0.5)', function() {
      expect(calculateNumber('DIVIDE', 1.2, 0.5)).to.equal(1);
    });
    it('should return "Error" for DIVIDE(1.4, 0)', function() {
      expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
    });
  });

  describe('Invalid type', function() {
    it('should throw for unknown type', function() {
      expect(() => calculateNumber('MUL', 1, 2))
        .to.throw(Error, 'Unknown type');
    });
  });
});

