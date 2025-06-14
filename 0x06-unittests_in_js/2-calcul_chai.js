#!/usr/bin/node
/**
 * calculateNumber: performs SUM, SUBTRACT or DIVIDE on two rounded numbers
 */
function calculateNumber(type, a, b) {
  const ra = Math.round(a);
  const rb = Math.round(b);

  switch (type) {
    case 'SUM':
      return ra + rb;
    case 'SUBTRACT':
      return ra - rb;
    case 'DIVIDE':
      if (rb === 0) return 'Error';
      return ra / rb;
    default:
      throw new Error('Unknown type');
  }
}

module.exports = calculateNumber;

