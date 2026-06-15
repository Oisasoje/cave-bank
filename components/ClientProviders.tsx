"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import SocketProvider from "@/src/providers/socket-provider";

export function ClientProviders({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  console.log("user", userId);
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider userId={userId}>{children}</SocketProvider>
    </QueryClientProvider>
  );
}
