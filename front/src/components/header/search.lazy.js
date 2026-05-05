import { lazy, Suspense } from 'react';

const Lazysearch = lazy(() => import('./search'));

const search = (props) => (
  <Suspense fallback={null}>
    <Lazysearch {...props} />
  </Suspense>
);

export default search;
