import api from "@/lib/api";

interface TransferData {
  pin: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  reason?: string;
}

export const initiateTransfer = (data: TransferData) => {
  return api("/transfer/initiate", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getUserByWalletAddress = (walletAddress: string) => {
  return api("/transfer/getReciepient", {
    method: "POST",
    body: JSON.stringify({
      walletAddress,
    }),
  });
};
