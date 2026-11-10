# How a flattened answer can land on a branch with no knowledge: interactive demo

Live: https://qnfo.github.io/paper-demo-hallucination-monna-map/

Companion to [Monna-Map Projection of Ultrametric Thought as a Geometric Explanation for Hallucination in LLMs](https://papers.qnfo.org/papers/monna-map-projection-of-ultrametric-thought-as-a-geometric-explanation-for-hallu).
Toy model (the paper is TRL 1-2, unreviewed). Uses the paper's Monna map phi(x)=sum a_i p^-i and depth-retention rho=k/D, and reproduces its numbers (0.9375%, 9.77e-4, 1.92%, 66.7%).

```
node --test js/math.test.mjs
```

MIT licence. Static, no build, no tracking.
