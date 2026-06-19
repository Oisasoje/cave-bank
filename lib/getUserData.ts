import { getUser } from "@/services/auth";
import { queryClient } from "./queryClient";
import {
  getBalance,
  getRecentTransactions,
  getTransactions,
} from "@/services/user";

const generateUserData = async () => {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["me"],
      queryFn: getUser,
      staleTime: Infinity,
      gcTime: 60 * 60 * 1000,
    }),

    ,
    queryClient.prefetchQuery({
      queryKey: ["balance"],
      queryFn: getBalance,
      staleTime: Infinity,
    }),
    queryClient.prefetchQuery({
      queryKey: ["transactions", { limit: 5 }],
      queryFn: () => getRecentTransactions(5),
      staleTime: Infinity,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ["transactions", "infinite"],
      queryFn: ({ pageParam }) => getTransactions({ pageParam, limit: 20 }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage: any) => lastPage.nextCursor ?? undefined,
    }),
  ]);
};

export default generateUserData;
