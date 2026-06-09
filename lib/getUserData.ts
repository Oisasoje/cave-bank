import { getUser } from "@/services/auth";
import { queryClient } from "./queryClient";

const generateUserData = async () => {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["me"],
      queryFn: getUser,
      staleTime: 10 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: ["balance"],
      staleTime: 10 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: ["transactions", { limit: 20 }],
      staleTime: 10 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),
  ]);
};

export default generateUserData;
