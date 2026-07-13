## 2025-05-15 - Audio Instance Reuse and Static Array Hoisting
**Learning:** Creating new `Audio` instances on every click in a large list of buttons (like an alphabet grid) causes significant memory pressure and latency. Hoisting static data arrays (e.g., `letters.split('')`) out of the render loop avoids redundant allocations.
**Action:** Always use `useRef` to maintain a single `Audio` instance for repetitive sound buttons and wrap leaf components in `React.memo`. Move static constants and data transformations outside of React component functions.
