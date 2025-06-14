const sinon = require('sinon');
const assert = require('assert');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', function() {
  it('should call Utils.calculateNumber with "SUM", totalAmount and totalShipping', function() {
    const spy = sinon.spy(Utils, 'calculateNumber');
    // call the function under test
    sendPaymentRequestToApi(100, 20);
    // assert spy was called exactly once
    assert.strictEqual(spy.calledOnce, true);
    // assert it was called with the correct arguments
    assert.strictEqual(
      spy.calledWithExactly('SUM', 100, 20),
      true
    );
    spy.restore();
  });
});

