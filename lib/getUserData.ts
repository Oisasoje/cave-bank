import { getUser } from "@/services/auth";
import { queryClient } from "./queryClient";
import { getBalance } from "@/services/user";

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
      staleTime: 60 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: ["transactions", { limit: 20 }],
      staleTime: 10 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),
  ]);
};

export default generateUserData;
