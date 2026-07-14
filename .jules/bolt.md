# Bolt's Performance Journal

## 2025-05-15 - Route-based Code Splitting
**Learning:** Initial bundle size and load time were significant due to ~30 synchronous route imports in `App.jsx`. Implementing `React.lazy` and `Suspense` for all pages is a high-value performance win for this architecture.
**Action:** Use `React.lazy` for all route-level components and wrap the `Routes` component in a `Suspense` boundary with a unified `Loading` fallback to ensure a smooth user experience during asynchronous chunk loading.
