"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

const makeClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  });

let queryClient: QueryClient | null = null;

export default function Providers({ children }: { children: React.ReactNode }) {
  // singleton QueryClient for the app lifetime in browser
  if (!queryClient) queryClient = makeClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
  <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}
