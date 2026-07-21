# Bolt's Performance Journal

## 2025-07-21 - [Optimizing Heavy Audio Instantiations inside React State]
**Learning:** Instantiating `new Audio()` inside state/initialization arrays inside functional React components causes severe performance bottlenecks because JavaScript evaluates those constructor expressions on every single render cycle, even though React discarded the value after the first render.
Additionally, placing hooks (like `useEffect`) above functional declarations (like `const startNewRound = useCallback(...)`) leads to Temporal Dead Zone (TDZ) ReferenceErrors because functional variables defined with `const` are hoisted but not initialized, crashing the page on load.

**Action:** Always hoist static asset references (like URLs, paths, labels) outside of the component. Use a single, lazily-initialized `Audio` instance inside a `useRef` to load and play audio dynamically on-demand, and make sure `useEffect` hooks are placed after all dependent callback definitions.
