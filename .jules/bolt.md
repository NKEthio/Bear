# Bolt's Performance Journal

## 2025-05-15 - Audio Instance Reuse Pattern
**Learning:** Instantiating a new `Audio` object on every user interaction (e.g., clicking a SoundButton) creates significant memory pressure and triggers frequent garbage collection, especially in apps with many sound-based interactions. Using `useRef` to maintain a single `Audio` instance per component lifecycle is a more efficient approach.
**Action:** Always reuse media instances via `useRef` or a centralized pool when dealing with frequent audio/video triggers.

## 2025-05-15 - Redundant Renders in Leaf Components
**Learning:** Small, frequently rendered components (like alphabet/number buttons in a grid) can cause noticeable UI lag if they re-render unnecessarily when parent state changes.
**Action:** Use `React.memo` for leaf components that represent static data or have stable props.
