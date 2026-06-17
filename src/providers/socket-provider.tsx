"use client";

import { useEffect } from "react";
import Pusher from "pusher-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/services/auth";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();

  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: getUser,
  });

  const userId = me?.data?.user?.id;
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
        queryClient.invalidateQueries({ queryKey: ["balance"] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      },
    );

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`user-${userId}`);
      pusher.disconnect();
    };
    // ... existing Pusher subscription logic ...
  }, [userId, queryClient]);

  return children;
}
