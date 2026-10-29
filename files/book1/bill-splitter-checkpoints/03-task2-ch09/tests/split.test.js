// Tests for Bill Splitter. Run them with: npm test

const test = require('node:test');
const assert = require('node:assert/strict');
const { splitBill, formatCents } = require('../src/split');

function shareTexts(result) {
  return result.sharesCents.map(formatCents);
}

function sum(numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}

test('criterion 1: 60.00 with a 10% tip between 3 people is 22.00 each, 66.00 in total', () => {
  const result = splitBill(60, 10, 3);
  assert.equal(formatCents(result.totalCents), '66.00');
  assert.deepEqual(shareTexts(result), ['22.00', '22.00', '22.00']);
});

test('criterion 2: 100.00 with no tip between 3 people is 33.34, 33.33, and 33.33', () => {
  const result = splitBill(100, 0, 3);
  assert.deepEqual(shareTexts(result), ['33.34', '33.33', '33.33']);
  assert.equal(sum(result.sharesCents), 10000);
});

test('criterion 2: the shares always add up to the total', () => {
  const examples = [
    [10, 0, 3],
    [99, 0, 3],
    [87.65, 12, 7],
    [0.05, 0, 3],
    [1234.56, 15, 50],
  ];
  for (const [bill, tip, people] of examples) {
    const result = splitBill(bill, tip, people);
    assert.equal(sum(result.sharesCents), result.totalCents, `bill ${bill}, tip ${tip}, ${people} people`);
  }
});

test('criterion 5: a 100% tip doubles the bill', () => {
  const result = splitBill(45, 100, 2);
  assert.equal(formatCents(result.totalCents), '90.00');
  assert.deepEqual(shareTexts(result), ['45.00', '45.00']);
});
