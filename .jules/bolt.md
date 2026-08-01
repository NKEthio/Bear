# Bolt's Performance Journal

## 2026-08-01 - [Optimize Hahu Amharic Alphabet Audio Playback and Memory Footprint]
**Learning:** Instantiating `new Audio()` on every single button click in massive grid components (like `Hahu.jsx` which displays the full Amharic alphabet with 31 rows of 7 columns plus numbers, totaling 237 buttons) causes excessive garbage collection (GC) overhead, memory churn, and lagging playback initialization. Additionally, keeping large static data arrays (like row lists) inside functional components triggers continuous re-allocation and garbage collection during React render/re-render cycles.
**Action:** Hoist all static array lists completely out of the functional component scope. Initialize a single, lazily loaded `Audio` instance inside a `useRef` to eliminate garbage collection pressure and dramatically optimize playback speed and initial rendering times.
