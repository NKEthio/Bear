# Bolt's Journal - Critical Performance Learnings

## 2025-07-27 - [Initial setup]
**Learning:** Initializing journal for Bolt performance-focused agent in Bearlearn codebase.
**Action:** Always document codebase-specific performance findings and patterns here.

## 2025-07-27 - [MatchCases and SoundButton Optimization]
**Learning:** In interactive React apps, passing callbacks that depend on mutable state (like `pairs` and `score`) into a `useEffect` dependency array can trigger a recursive-like logic and rendering loop on every interaction. For instance, in `MatchCases.jsx`, updating matched pairs or scores caused the initialization `useEffect` to trigger again, shuffling the board on every correct match. Changing this to an empty dependency array `[]` safely isolates initialization to the mount phase.
Furthermore, instantiating `new Audio(sound)` on every button click creates high garbage collection pressure. Creating a single `Audio` instance lazily via `useRef` and synchronizing its `src` via `useEffect` achieves lightning-fast, zero-overhead audio playback.
**Action:** Always restrict initial game starts/setups to mount-only effects (`[]`), and leverage `useRef` to cache heavy audio media objects inside React leaf components.
