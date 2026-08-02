## 2026-08-02 - Single Audio Element Reuse & Function Hoisting in Interactive Pages

**Learning:**
In highly interactive pages like `Qalat.jsx` (Amharic Words learning page), allocating a `new Audio()` object on every click introduces significant garbage collection pressure, leading to frame drops on lower-end mobile devices. Additionally, multiple consecutive clicks cause sounds to overlap and play simultaneously, creating a chaotic user experience.

By hoisting helper functions outside of the component, we avoid unnecessary function re-creations. By lazily initializing a single `Audio` instance inside a `useRef` and cleaning up active audio during unmount, we significantly lower CPU and memory usage, and ensure instant, responsive, and interruptible audio playback (preventing concurrent overlap).

**Action:**
Always reuse `Audio` elements via `useRef` on components with repetitive click-to-play sound behaviors. Hoist static helper/getter functions outside the React component scope to eliminate garbage collection churn on renders. Ensure proper unmount cleanup inside `useEffect` to release the audio resources.
