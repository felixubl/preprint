The reference plotted figure — a quadratic loss with a visible step-size failure mode.

```jsx
<Figure number={1} note={gdVerdict(lr).text} label="Gradient descent on a quadratic loss."
  controls={<input type="range" min="0.05" max="1.35" step="0.05" value={lr} onChange={(e) => setLr(+e.target.value)} />}>
  <GradientDescent lr={lr} steps={steps} />
</Figure>
```

Copy the two rules it demonstrates into any new figure: plates by **position**
(curve 3, path 2, answer 1), and derive the sampled domain from the frame rather
than clamping y — a curve drawn flat where it is steepest is a lie.
