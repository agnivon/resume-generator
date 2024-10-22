"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      //staleTime: 5 * 60 * 1000,
      staleTime: Infinity,
      //gcTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

export default function ReactQueryProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
