type Transaction = {
  monthKey: string;
  type: "debit" | "credit";
  [key: string]: any;
};

type TransactionIndex = {
  byMonth: Record<string, Transaction[]>;
  byType: {
    debit: Transaction[];
    credit: Transaction[];
  };
};

export default function buildIndex(txns: Transaction[]): TransactionIndex {
  const byMonth: Record<string, Transaction[]> = {};
  const byType: { debit: Transaction[]; credit: Transaction[] } = {
    debit: [],
    credit: [],
  };

  for (const txn of txns) {
    const month = txn.monthKey;

    if (!byMonth[month]) byMonth[month] = [];
    byMonth[month].push(txn);

    byType[txn.type].push(txn);
  }

  return { byMonth, byType };
}
