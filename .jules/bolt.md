## 2025-05-22 - [Optimized SoundButton audio playback]
**Learning:** Repeatedly creating `new Audio()` instances on user interactions like button clicks leads to unnecessary memory allocation and can cause performance stuttering due to garbage collection, especially on low-end devices or when many interactions occur. Reusing a single `Audio` instance per component via `useRef` is much more efficient.
**Action:** Always prefer reusing `Audio` objects or a centralized audio pool instead of creating new instances for every playback event.
