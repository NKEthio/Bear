# Bolt's Journal - Critical Performance Learnings

## 2025-06-15 - [Audio Node Proliferation and Static Allocations in Large Grids]
**Learning:** In highly interactive educational grids (such as the 61-item alphabet/number layout), creating inline Audio instances inside leaf component actions and splitting static arrays within the render path causes severe garbage collection (GC) pressure, frame drops, and re-allocation overhead. Wrapping leaf nodes in `React.memo` and utilizing a lazy-initialized `useRef` to maintain and synchronize a single `Audio` node per component completely bypasses consecutive layout thrashing and allocation loops.
**Action:** When designing heavy grids or lists in React, always hoist static structures (e.g., configurations, static splits) outside component scopes, and delegate media playback state and objects to refs rather than recreating them or maintaining unnecessary reactive re-rendering states.
