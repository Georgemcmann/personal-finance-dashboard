import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={
        <div className="h-screen w-screen flex items-center justify-center font-medium text-muted-foreground">
          Loading operational nodes...
        </div>
      }>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}