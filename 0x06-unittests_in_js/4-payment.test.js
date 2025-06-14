const sinon = require('sinon');
const assert = require('assert');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi (with stub)', function() {
  let calculateStub;
  let logSpy;

  beforeEach(function() {
    // stub the heavy function to always return 10
    calculateStub = sinon.stub(Utils, 'calculateNumber').returns(10);
    // spy on console.log
    logSpy = sinon.spy(console, 'log');
  });

  afterEach(function() {
    // restore both stub and spy
    calculateStub.restore();
    logSpy.restore();
  });

  it('should call Utils.calculateNumber with "SUM", 100 and 20', function() {
    sendPaymentRequestToApi(100, 20);

    assert.strictEqual(calculateStub.calledOnce, true);
    assert.strictEqual(
      calculateStub.calledWithExactly('SUM', 100, 20),
      true
    );
  });

  it('should log "The total is: 10"', function() {
    sendPaymentRequestToApi(100, 20);

    assert.strictEqual(logSpy.calledOnce, true);
    assert.strictEqual(
      logSpy.calledWithExactly('The total is: 10'),
      true
    );
  });
});

