"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Providers } from "@/components/Providers";
import SocketProvider from "@/src/providers/socket-provider";

export function ClientProviders({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <SocketProvider userId={userId}>{children}</SocketProvider>
      </Providers>
    </QueryClientProvider>
  );
}
