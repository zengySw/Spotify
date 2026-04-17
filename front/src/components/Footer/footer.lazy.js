import { lazy, Suspense } from 'react';

const Lazyfooter = lazy(() => import('./footer'));

const footer = (props) => (
  <Suspense fallback={null}>
    <Lazyfooter {...props} />
  </Suspense>
);

export default footer;
