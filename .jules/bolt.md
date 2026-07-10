## 2025-05-15 - [Route-based Code Splitting]
**Learning:** In a React application with many routes (30+ in this case), static imports in the main `App.jsx` lead to a bloated initial bundle. Implementing `React.lazy` and `React.Suspense` effectively distributes the load, reducing the initial JS payload by ~150kB (uncompressed) or ~41kB (gzipped).
**Action:** Always prefer route-based code splitting for applications with distinct views to improve "Time to Interactive" and reduce initial bandwidth usage.
