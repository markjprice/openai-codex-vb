// Tests for the contact form checks in src/contact/validate.js.
// Run them with: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, MESSAGES } from '../../src/contact/validate.js';

const fieldsWithErrors = (result) => result.errors.map((error) => error.field);

test('a filled-in form with a valid email address has no errors', () => {
  const result = validateContact({ email: 'sam@example.com', message: 'Hello!' });
  assert.deepEqual(result.errors, []);
  assert.equal(result.isSpam, false);
});

test('an empty form reports the email address first, then the message', () => {
  const result = validateContact({ email: '', message: '' });
  assert.deepEqual(result.errors, [
    { field: 'email', message: MESSAGES.emailMissing },
    { field: 'message', message: MESSAGES.messageMissing },
  ]);
});

test('spaces alone count as empty', () => {
  const result = validateContact({ email: '   ', message: '   ' });
  assert.deepEqual(fieldsWithErrors(result), ['email', 'message']);
});

test('email addresses in the wrong format are rejected', () => {
  for (const email of ['sam', 'sam@', '@example.com', 'sam@example', 'sam @example.com']) {
    const result = validateContact({ email, message: 'Hi' });
    assert.deepEqual(result.errors, [{ field: 'email', message: MESSAGES.emailFormat }], email);
  }
});

test('a message of exactly 2,000 characters is accepted', () => {
  const result = validateContact({ email: 'sam@example.com', message: 'a'.repeat(2000) });
  assert.deepEqual(result.errors, []);
});

test('a message of 2,001 characters is too long', () => {
  const result = validateContact({ email: 'sam@example.com', message: 'a'.repeat(2001) });
  assert.deepEqual(result.errors, [{ field: 'message', message: MESSAGES.messageTooLong }]);
});

test('a filled-in honeypot field marks the message as spam', () => {
  const result = validateContact({ email: 'bot@example.com', message: 'Buy now', botField: 'x' });
  assert.equal(result.isSpam, true);
});

test('every error message says what to do', () => {
  for (const message of Object.values(MESSAGES)) {
    assert.match(message, /^(Enter|Shorten) /);
  }
});
