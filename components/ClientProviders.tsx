"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Providers } from "@/components/Providers";
import SocketProviders from "@/app/provider";

export function ClientProviders({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  console.log(userId);

  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <SocketProviders userId={userId}>{children}</SocketProviders>
      </Providers>
    </QueryClientProvider>
  );
}
