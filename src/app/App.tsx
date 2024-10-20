import './styles/App.css';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { router } from '@/app/routing/Router.tsx';
import { Toaster } from '@/components/ui/toaster.tsx';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster />
    </>
  );
};

export default App;
