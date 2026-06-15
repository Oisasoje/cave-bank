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
      queryClient.setQueryData(["balance"], (old: any) => {
        if (!old) return old;
        const current = old.data.balance;
        const newBalance =
          type === "credit"
            ? current + Number(amount)
            : current - Number(amount);

        return {
          ...old,
          data: {
            ...old.data,
            balance: newBalance,
          },
        };
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    });

    return () => {
      socket.disconnect();
      socket.off("wallet:updated");
    };
  }, [userId, queryClient]);
  return children;
}
