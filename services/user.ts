import api from "@/lib/api";

export const getBalance = () => {
  return api("/user/getBalance", {
    method: "GET",
  });
};

export const getTransactions = ({
  pageParam,
  limit = 20,
}: {
  pageParam?: string;
  limit?: number;
}) => {
  const params = new URLSearchParams({ limit: String(limit) });
  if (pageParam) params.set("cursor", pageParam);

  return api(`/user/transactions?${params}`, {
    method: "GET",
  });
};

export const getRecentTransactions = async (limit = 10) => {
  return api(`/user/transactions?limit=${limit}`, {
    method: "GET",
  });
};

export const getTransactionById = (transactionId: string) => {
  return api(`/user/transactions/${transactionId}`, {
    method: "GET",
  });
};
