"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";

export default function SocketProvider({
  userId,
  children,
}: {
  userId: string;
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    socket.auth = { userId };
    socket.connect();

    socket.on("wallet:updated", ({ type, amount }) => {
      queryClient.setQueryData(["balance"], (old: number = 0) => {
        if (type === "credit") return old + amount;
        if (type === "debit") return old - amount;
        return old;
      });
    });

    return () => {
      socket.disconnect();
      socket.off("wallet:updated");
    };
  }, [userId, queryClient]);

  return children;
}
