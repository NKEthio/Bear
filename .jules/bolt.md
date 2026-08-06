## 2025-08-06 - Preventing Audio Recreation Overhead and Overlaps in Alphabet/Word pages
**Learning:** Re-instantiating heavy `Audio` objects within rapid click events (such as the alphabet grids or sequential audio paths) causes high garbage collection pressure, memory leaks, and overlapping sound playbacks that degrade the UX.
**Action:** Use `useRef` to lazily instantiate and reuse a single or group of sequential `Audio` references. When playing a sound, pause any currently active `Audio` ref, clear its callback listeners, change `.src` dynamically, and then trigger playback.
