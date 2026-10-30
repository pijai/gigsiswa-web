import assert from 'node:assert/strict';
import { test } from 'node:test';
import { doneMessage, isEmail, resultFor } from './main.js';

test('accepts real-looking emails, with stray spaces', () => {
  assert.equal(isEmail(' aina@student.uitm.edu.my '), true);
  assert.equal(isEmail('aina@uitm'), false);
  assert.equal(isEmail('aina student@uitm.edu.my'), false);
});

test('maps API answers to what the visitor sees', () => {
  assert.deepEqual(resultFor(202), { ok: true });
  assert.match(resultFor(400).error, /email looks incomplete/);
  assert.match(resultFor(429).error, /Wait a minute/);
  assert.match(resultFor(0).error, /connection/);
  assert.match(resultFor(500).error, /couldn't save/);
});

test('thanks students and businesses differently', () => {
  assert.match(doneMessage('BUSINESS', 'cafe@biz.my'), /opens for businesses/);
  assert.match(doneMessage('STUDENT', 'aina@uitm.my'), /cari gig/);
});
