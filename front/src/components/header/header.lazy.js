import { lazy, Suspense } from 'react';

const Lazyheader = lazy(() => import('./header'));

const header = (props) => (
  <Suspense fallback={null}>
    <Lazyheader {...props} />
  </Suspense>
);

export default header;
