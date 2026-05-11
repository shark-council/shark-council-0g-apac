"use client";

import {
  QueryClient,
  QueryClientProvider as OriginClientProvider,
} from "@tanstack/react-query";

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <OriginClientProvider client={queryClient}>{children}</OriginClientProvider>
  );
}
