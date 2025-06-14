const sinon = require('sinon');
const assert = require('assert');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi (hooks)', function() {
  let logSpy;

  beforeEach(function() {
    // create one spy on console.log before each test
    logSpy = sinon.spy(console, 'log');
  });

  afterEach(function() {
    // restore console.log after each test
    logSpy.restore();
  });

  it('logs "The total is: 120" once for (100, 20)', function() {
    sendPaymentRequestToApi(100, 20);

    // spy should have been called exactly once
    assert.strictEqual(logSpy.calledOnce, true);
    // with the exact expected message
    assert.strictEqual(
      logSpy.calledWithExactly('The total is: 120'),
      true
    );
  });

  it('logs "The total is: 20" once for (10, 10)', function() {
    sendPaymentRequestToApi(10, 10);

    assert.strictEqual(logSpy.calledOnce, true);
    assert.strictEqual(
      logSpy.calledWithExactly('The total is: 20'),
      true
    );
  });
});

