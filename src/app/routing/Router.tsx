import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import { Spinner } from '@/shared/components/PageLoader.tsx';
import { ErrorPage } from '@/pages/error-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { NAVIGATION_ROUTES } from '@/app/routing/routes.ts';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: (
      <Suspense
        fallback={
          <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
            <Spinner />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: NAVIGATION_ROUTES.SIGN_IN,
        lazy: async () => ({
          Component: (await import('@/pages/sign-in-page')).default,
        }),
      },
    ],
  },
  { path: '*', Component: NotFoundPage },
]);
