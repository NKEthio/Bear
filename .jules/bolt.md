# Bolt's Journal - Critical Performance Learnings

## 2025-07-29 - [Avoid Multiple HTML5 Audio Initialization Overhead]
**Learning:** Instantiating dozens of `Audio` objects simultaneously (e.g., inside a React `useState` initializer array with 35 elements) severely degrades performance. Each `new Audio(...)` call triggers synchronous browser allocation, starts unnecessary pre-fetching threads, and consumes browser media channel resources. Furthermore, the `useState(initialValue)` parameter expression evaluates on *every* single render cycle, leading to rapid garbage collection pressure and resource leaks of un-disposed media handles.
**Action:** Always store lightweight file path strings in static constants defined *outside* the React component. Use a single, reusable `Audio` object instantiated lazily via a React `useRef(null)`. Dynamically update the `.src` of the single ref-held instance when playback is triggered, and ensure to pause/clean up the reference on component unmount.
