import { lazy, Suspense } from 'react';

// three.js is most of the JavaScript; load it after the page text so the first paint is fast.
const Chrome = lazy(() => import('./Chrome'));

export default function LazyChrome(props) {
  return (
    <Suspense fallback={<div className={props.className} aria-hidden="true" />}>
      <Chrome {...props} />
    </Suspense>
  );
}
