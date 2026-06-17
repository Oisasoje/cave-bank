export default function enrichTxns(txns: any) {
  return txns.map((txn: any) => ({
    ...txn,
    monthKey: txn.created_at.slice(0, 7), // "2026-06"
  }));
}
