"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import SocketProvider from "@/src/providers/socket-provider";
import Script from "next/script";

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
      <SocketProvider userId={userId}>
        {children}
        <Script
          src="//cdn.jsdelivr.net/npm/eruda"
          strategy="afterInteractive"
          onLoad={() => {
            (window as any).eruda.init();
          }}
        />
      </SocketProvider>
    </QueryClientProvider>
  );
}
