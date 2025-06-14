const request = require('request');
const { expect } = require('chai');

const base = 'http://localhost:7865';

describe('Index page', function() {
  it('GET / → 200 & correct body', function(done) {
    request.get(`${base}/`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });
});

describe('Cart page', function() {
  it('GET /cart/12 → 200 & correct body', function(done) {
    request.get(`${base}/cart/12`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(body).to.equal('Payment methods for cart 12');
      done();
    });
  });

  it('GET /cart/hello → 404', function(done) {
    request.get(`${base}/cart/hello`, (err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
});

describe('Available payments', function() {
  it('GET /available_payments → 200 & JSON body', function(done) {
    request.get(`${base}/available_payments`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      const parsed = JSON.parse(body);
      expect(parsed).to.deep.equal({
        payment_methods: {
          credit_cards: true,
          paypal: false
        }
      });
      done();
    });
  });
});

describe('Login', function() {
  it('POST /login → 200 & welcome message', function(done) {
    request.post({
      url: `${base}/login`,
      body: JSON.stringify({ userName: 'Betty' }),
      headers: { 'Content-Type': 'application/json' }
    }, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(body).to.equal('Welcome Betty');
      done();
    });
  });
});

