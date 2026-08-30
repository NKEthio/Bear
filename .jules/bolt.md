# Bolt's Journal - Critical Performance learnings

This journal holds performance-related insights, bottlenecks, and optimizations for this codebase.

## 2026-05-11 - Optimize Eager Audio Instantiation in React Components
**Learning:** Instantiating dozens of heavy browser elements (like `Audio` DOM nodes) inside component hooks (such as passing them directly to a `useState` array constructor) forces the browser to eagerly allocate and buffer media files on every render/mount cycle. This creates huge CPU and memory overhead, resulting in stuttering, higher heap size, and garbage collection pressure.
**Action:** Hoist the static list of asset URLs outside the React component, and lazy-initialize/reuse a single `Audio` channel inside `useRef` to play the files dynamically on demand. Ensure proper cleanup on component unmount to prevent memory leaks.
