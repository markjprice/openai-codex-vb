// Tests for Bill Splitter. Run them with: npm test

const test = require('node:test');
const assert = require('node:assert/strict');
const { splitBill } = require('../src/split');

test('criterion 1: 60.00 with a 10% tip between 3 people is 22.00 each, 66.00 in total', () => {
  const result = splitBill(60, 10, 3);
  assert.equal(result.total.toFixed(2), '66.00');
  assert.equal(result.share.toFixed(2), '22.00');
});

test('criterion 5: a 100% tip doubles the bill', () => {
  const result = splitBill(45, 100, 2);
  assert.equal(result.total.toFixed(2), '90.00');
  assert.equal(result.share.toFixed(2), '45.00');
});
