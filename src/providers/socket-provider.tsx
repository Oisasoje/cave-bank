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

    socket.on("connect", () => console.log("✅ connected:", socket.id));
    socket.on("connect_error", (err) => console.log("❌ error:", err.message));

    socket.on("wallet:updated", ({ type, amount }) => {
      console.log("💸 wallet updated:", type, amount);
      console.log(
        "🗂 all cache keys:",
        queryClient
          .getQueryCache()
          .getAll()
          .map((q) => q.queryKey),
      );

      queryClient.setQueryData(["balance"], (old: any) => {
        console.log("📦 current cache:", old);
        if (!old) return old;
        const current = old.data.balance;
        const newBalance =
          type === "credit" ? current + amount : current - amount;
        console.log("💰 updating balance:", current, "→", newBalance);
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
