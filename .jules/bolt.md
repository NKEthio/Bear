# Bolt's Journal - Performance Optimization Learnings

## 2026-05-10 - [Lazy Audio and Hoisted Questions in AlphabetQuiz & HohiatQuiz]
**Learning:** Creating multiple `new Audio(...)` instances inside React component state on mount triggers heavy DOM/browser media handle allocations and immediate network file loading. Reusing a single `Audio` channel inside `useRef` and updating its `.src` dynamically reduces memory consumption, garbage collection pressure, and loading latency significantly. Furthermore, hoisting read-only question arrays outside component render cycles avoids redundant array re-allocations on every single render.
**Action:** Always hoist static asset mappings and questions outside the React component function, and lazy-load/play audios using a single `useRef(null)` initialized on-demand.
