#!/usr/bin/node
const Utils = require('./utils');

/**
 * sendPaymentRequestToApi - sums totalAmount + totalShipping
 * @param {number} totalAmount
 * @param {number} totalShipping
 */
function sendPaymentRequestToApi(totalAmount, totalShipping) {
  const result = Utils.calculateNumber('SUM', totalAmount, totalShipping);
  console.log(`The total is: ${result}`);
}

module.exports = sendPaymentRequestToApi;

