"use client";

import SocketProvider from "@/src/providers/socket-provider";

export default function SocketProviders({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  return <SocketProvider userId={userId}>{children}</SocketProvider>;
}
