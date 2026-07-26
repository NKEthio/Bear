# Bolt's Journal - Critical Learnings Only

## 2025-01-24 - Avoid Heavy Object Initialization in useState Expressions
**Learning:** Initializing heavy web API objects like `new Audio()` inside a `useState(...)` expression (e.g. `useState(new Audio(...))`) evaluates on *every single render cycle*, even though React only utilizes the initial value once. This leads to massive memory leaks, high garbage collection pressure, and mounting latencies (especially when in large arrays).
**Action:** Always lazy-initialize heavy objects inside a `useRef` or outside the React component. Use the `const audioRef = useRef(null)` and initialize it on-demand on user interactions (like a play button click).

## 2025-01-24 - Hoist Static Data and Asset Maps Outside Components
**Learning:** Placing static lists of configurations, assets, or letters/numbers within the component causes React to re-allocate memory for those arrays and strings on every render cycle.
**Action:** Hoist any non-dynamic data structures, local configurations, and asset lists directly above the component declaration as file-level `const` variables.

## 2025-01-24 - Use Refs for Component State Independent of JSX Layout
**Learning:** Keeping audio playback flags (like `isPlaying`) as component state results in redundant re-renders whenever the state toggles (e.g., on start, on play, on pause, on end).
**Action:** For visual state changes, keep the state. But if the playback flag only tracks internal playback state/logic and doesn't visually modify layout/JSX directly, use a render-free ref (e.g., `isPlayingRef`) to handle status tracking without triggering component re-renders.
