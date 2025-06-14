const request = require('request');
const { expect } = require('chai');

describe('Index page', function() {
  const url = 'http://localhost:7865';

  it('returns status code 200', function(done) {
    request.get(url, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('returns the correct body', function(done) {
    request.get(url, (err, res, body) => {
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });

  it('has a Content-Type header containing text/html', function(done) {
    request.get(url, (err, res, body) => {
      expect(res.headers['content-type']).to.include('text/html');
      done();
    });
  });
});

