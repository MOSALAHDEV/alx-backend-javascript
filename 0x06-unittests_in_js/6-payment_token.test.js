const assert = require('assert');
const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', function() {
  it('should resolve with the correct data when success is true', function(done) {
    const promise = getPaymentTokenFromAPI(true);
    // Ensure we got back a Promise
    assert(promise instanceof Promise);

    promise
      .then((result) => {
        // result must match exactly
        assert.deepStrictEqual(
          result,
          { data: 'Successful response from the API' }
        );
        done();
      })
      .catch(done);
  });
});

