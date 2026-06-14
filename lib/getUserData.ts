import { getUser } from "@/services/auth";
import { queryClient } from "./queryClient";
import { getBalance, getRecentTransactions } from "@/services/user";

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
      queryKey: ["transactions", { limit: 10 }],
      queryFn: () => getRecentTransactions(10),
      staleTime: Infinity,
    }),
  ]);
};

export default generateUserData;
