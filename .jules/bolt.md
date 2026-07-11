## 2026-07-11 - [Optimize SoundButton performance]
**Learning:** Reusing `Audio` instances via `useRef` and wrapping frequently rendered leaf components in `React.memo` significantly reduces memory pressure and prevents redundant re-renders, especially in pages like `Alphabets` where dozens of buttons are present. Syncing the `src` via `useEffect` and handling `play()` promises with `.catch()` are essential for correctness and avoiding console errors.
**Action:** Always consider `useRef` for media elements and `React.memo` for high-count UI components in this application.
