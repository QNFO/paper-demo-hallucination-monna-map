import { createRequire } from 'node:module';
import test from 'node:test';
import assert from 'node:assert/strict';
const M = createRequire(import.meta.url)('./math.js');
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) < e, a + ' vs ' + b);
test('paper 4.2 shallow survival 0.9375%', () => near(M.survive(5, 2), 0.009375));
test('paper 4.3 distinguishable fraction', () => near(M.distinguishable(20, 10), 9.765625e-4));
test('paper 4.4 floor 1.92%', () => near(M.floor(0.7, 10, 20), 0.0192147216, 1e-9));
test('paper 7.5 loss 0.6 -> 0.2 is 66.7% drop', () => near(1 - M.loss(4, 5) / M.loss(2, 5), 2 / 3));
test('phi and truncation', () => {
  assert.deepEqual(M.digits(22, 5), [1, 0, 1, 1, 0]);
  near(M.phi(22, 5), 0.6875);
  assert.equal(M.truncate(22, 5, 2), 16);
  assert.equal(M.truncate(22, 5, 5), 22);
});
test('outcomes', () => {
  assert.equal(M.outcome(22, 5, 5, [22]).kind, 'exact');
  assert.equal(M.outcome(22, 5, 2, [16]).kind, 'wrong-but-supported');
  assert.equal(M.outcome(22, 5, 2, [3]).kind, 'hallucination');
});
