## 2026-08-03 - Reusable Sequential Audio & Data Hoisting in AlphabetWords
**Learning:**
Instantiating multiple `new Audio()` elements sequentially on user actions (such as clicking letters in `AlphabetWords.jsx`) causes notable memory footprint overhead and triggers heavy garbage collection churn. Furthermore, if a user clicks on items rapidly, multiple parallel sound plays can overlap, producing chaotic, concurrent audio playbacks.

By hoisting static lookup datasets (like the 26-item `alphabetWords` array) and helper functions outside of the component, we avoid redundant heap allocations during render cycles. By utilizing a single, lazily initialized `Audio` element inside a `useRef` and scheduling the sequential segments inside the `onended` chain, we prevent sound overlaps, ensure responsive, interruptible, and clean playback, and dramatically reduce memory allocation.

**Action:**
For components requiring sequential audio transitions, always reuse a single `Audio` node via `useRef` and cascade the segments through dynamic `src` updates in `onended` listeners rather than instantiating multiple distinct audio elements.
