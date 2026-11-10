// Toy Monna-map model, definitions from the paper (sections 3.1-3.4, 4.2-4.4).
(function (root) {
  var P = 2;
  function digits(leaf, D) { var a = [], i; for (i = D - 1; i >= 0; i--) a.push((leaf >> i) & 1); return a; }
  // phi(x) = sum a_i p^-i
  function phi(leaf, D) { return leaf / Math.pow(P, D); }
  function truncate(leaf, D, k) { var s = D - k; return (leaf >> s) << s; } // keep top k digits, rest zero
  function rho(k, D) { return k / D; }
  function loss(k, D) { return 1 - k / D; }
  function survive(D, k) { var f = Math.pow(P, k) / Math.pow(P, D); return f * f * (1 - k / D); }
  function distinguishable(L, k) { return Math.pow(P, k - L); }
  function floor(q, k, L) { return Math.pow(q, k + 1) - Math.pow(q, L + 1); }
  // Outcome of asking about `leaf` when only k digits survive; `known` is a Set/array of supported leaves.
  function outcome(leaf, D, k, known) {
    var out = truncate(leaf, D, k), has = function (x) { return known.indexOf(x) >= 0; };
    if (out === leaf) return { out: out, kind: has(leaf) ? 'exact' : 'exact-unknown' };
    return { out: out, kind: has(out) ? 'wrong-but-supported' : 'hallucination' };
  }
  var api = { digits: digits, phi: phi, truncate: truncate, rho: rho, loss: loss, survive: survive, distinguishable: distinguishable, floor: floor, outcome: outcome };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Monna = api;
})(this);
