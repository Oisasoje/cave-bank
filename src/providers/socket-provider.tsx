"use client";

import { useEffect } from "react";
import Pusher from "pusher-js";
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

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(`user-${userId}`);

    // unbind first before binding to prevent duplicates
    channel.unbind("wallet:updated");
    channel.bind(
      "wallet:updated",
      ({ type, amount }: { type: string; amount: number }) => {
        console.log("💸 wallet updated:", type, amount);
        queryClient.invalidateQueries({ queryKey: ["balance"] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      },
    );

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`user-${userId}`);
      pusher.disconnect();
    };
  }, [userId, queryClient]);

  return children;
}
