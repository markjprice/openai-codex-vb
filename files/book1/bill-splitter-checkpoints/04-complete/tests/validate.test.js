// Tests for checking what the user types. Run them with: npm test

const test = require('node:test');
const assert = require('node:assert/strict');
const { parseBill, parseTip, parsePeople, askUntilValid } = require('../src/validate');

test('criterion 3: letters, a negative number, or nothing for the bill total are rejected with a message', () => {
  for (const answer of ['abc', '-20', '', '   ', '0', '12.345']) {
    const result = parseBill(answer);
    assert.equal(result.ok, false, `"${answer}" should be rejected`);
    assert.match(result.message, /greater than 0/);
  }
});

test('criterion 3: valid bill totals are accepted', () => {
  assert.deepEqual(parseBill('60'), { ok: true, value: 60 });
  assert.deepEqual(parseBill('45.50'), { ok: true, value: 45.5 });
  assert.deepEqual(parseBill(' 100.00 '), { ok: true, value: 100 });
});

test('criterion 3: after an invalid bill total, the question is asked again', async () => {
  const answers = ['abc', '-20', '', '60'];
  const questions = [];
  const messages = [];
  const ask = async (question) => {
    questions.push(question);
    return answers.shift();
  };
  const say = (message) => messages.push(message);

  const bill = await askUntilValid(ask, say, 'Bill total: ', parseBill);

  assert.equal(bill, 60);
  assert.equal(questions.length, 4);
  assert.equal(messages.length, 3);
});

test('criterion 4: 0 or 51 people are rejected with a message giving the allowed range', () => {
  for (const answer of ['0', '51']) {
    const result = parsePeople(answer);
    assert.equal(result.ok, false);
    assert.match(result.message, /from 1 to 50/);
  }
});

test('criterion 4: 1 and 50 people are accepted', () => {
  assert.deepEqual(parsePeople('1'), { ok: true, value: 1 });
  assert.deepEqual(parsePeople('50'), { ok: true, value: 50 });
});

test('criterion 4: after an invalid number of people, the question is asked again', async () => {
  const answers = ['0', '51', '3'];
  const messages = [];
  const people = await askUntilValid(
    async () => answers.shift(),
    (message) => messages.push(message),
    'Number of people: ',
    parsePeople
  );
  assert.equal(people, 3);
  assert.equal(messages.length, 2);
});

test('the tip must be a whole number from 0 to 100', () => {
  assert.deepEqual(parseTip('0'), { ok: true, value: 0 });
  assert.deepEqual(parseTip('100'), { ok: true, value: 100 });
  for (const answer of ['101', '-5', '12.5', 'ten', '']) {
    assert.equal(parseTip(answer).ok, false, `"${answer}" should be rejected`);
  }
});
