const enrichTxns = (txns: any) => {
  return txns.map((txn: any) => ({
    ...txn,
    monthKey: txn.createdAt.slice(0, 7), // "2026-06"
  }));
};
