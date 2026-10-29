// Tests for Bill Splitter. Run them with: npm test

const test = require('node:test');
const assert = require('node:assert/strict');

test('the logic file can be loaded', () => {
  const split = require('../src/split');
  assert.equal(typeof split, 'object');
});
