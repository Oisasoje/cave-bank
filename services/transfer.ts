import api from "@/lib/api";

export const getUserByWalletAddress = (walletAddress: string) => {
  return api("/transfer/getReciepient", {
    method: "POST",
    body: JSON.stringify({
      walletAddress,
    }),
  });
};
