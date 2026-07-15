# Bolt's Performance Journal

## 2025-05-14 - SoundButton Optimization
**Learning:** In components that are rendered in large numbers (like an alphabet grid), repeated instantiation of heavy objects like `Audio` causes significant memory overhead and GC pressure. Additionally, these leaf components often re-render unnecessarily if not memoized.
**Action:** Use `React.memo` for leaf components in large grids and `useRef` to maintain single instances of heavy objects like `Audio`, synchronizing their state via `useEffect` when props change.

## 2025-05-14 - Static Data Hoisting
**Learning:** Static data transformations (like `string.split('')`) inside a component's body execute on every render cycle. While fast, they are redundant for data that never changes.
**Action:** Hoist all static arrays, constants, and mapping objects outside of component functions to avoid re-allocation during render cycles.
