"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inter, DM_Sans } from "next/font/google";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTransactions } from "@/services/user";
import TransactionSkeleton from "@/components/TransactionsSkeleton";
import enrichTxns from "@/lib/enrichTransactions";
import buildIndex from "@/lib/buildTransactionsIndex";
import { formatDate } from "@/lib/formatDate";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type TransactionType = "debit" | "credit";
type FilterTab = "All" | "Sent" | "Received";

export interface TransactionUser {
  name: string;
}

interface TransactionAccount {
  users: TransactionUser;
  address: string;
}

export interface DBTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  created_at: string;
  accounts_to?: TransactionAccount | null;
  accounts_from?: TransactionAccount | null;
}

interface EnrichedTransaction extends DBTransaction {
  monthKey: string;
}

const tabToType = {
  All: "all",
  Sent: "debit",
  Received: "credit",
} as const;

export default function TransactionsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<{
    month: string;
    type: "all" | "debit" | "credit";
  }>({
    month: "all",
    type: "all",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["transactions", "infinite"],
      queryFn: ({ pageParam }) => getTransactions({ pageParam, limit: 20 }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });
  const transactions =
    (data?.pages.flatMap((page) => page.data) as DBTransaction[]) ?? [];

  const indexed = useMemo(() => {
    const enriched = enrichTxns(transactions) as EnrichedTransaction[];
    return buildIndex(enriched) as {
      byMonth: Record<string, EnrichedTransaction[]>;
      byType: {
        debit: EnrichedTransaction[];
        credit: EnrichedTransaction[];
      };
    };
  }, [transactions]);

  const grouped = useMemo(() => {
    const result: Record<string, EnrichedTransaction[]> = {};

    if (filter.month !== "all") {
      const txns = indexed.byMonth[filter.month] || [];
      const filtered =
        filter.type !== "all"
          ? txns.filter((t) => t.type === filter.type)
          : txns;
      if (filtered.length > 0) {
        result[filter.month] = filtered;
      }
    } else {
      for (const [month, txns] of Object.entries(indexed.byMonth)) {
        const filtered =
          filter.type !== "all"
            ? txns.filter((t) => t.type === filter.type)
            : txns;
        if (filtered.length > 0) {
          result[month] = filtered;
        }
      }
    }
    return result;
  }, [indexed, filter]);

  const sortedMonthKeys = useMemo(() => {
    return Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  }, [grouped]);

  const availableMonths = useMemo(() => {
    return Object.keys(indexed.byMonth).sort((a, b) => b.localeCompare(a));
  }, [indexed]);

  const formatMonthKey = (key: string) => {
    if (key === "all") return "All Months";
    const [year, month] = key.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const tabs: FilterTab[] = ["All", "Sent", "Received"];

  return (
    <div
      className={`max-w-md mx-auto bg-neutral-50 flex flex-col w-full min-h-dvh relative ${inter.className} select-none`}
    >
      {/* ──── STICKY HEADER ──── */}
      <div className="sticky top-0 z-30 bg-neutral-50">
        {/* Top bar with back button and title */}
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <button
            id="transactions-back-btn"
            onClick={() => router.back()}
            className="w-[38px] h-[38px] rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1F2937"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1
            className={`text-[17px] font-bold text-neutral-900 tracking-tight ${dm_sans.className}`}
          >
            Transaction History
          </h1>
        </div>

        {/* Filter tabs + Month selector */}
        <div className="flex items-center justify-between px-5 pb-4">
          {/* Tabs */}
          <div className="flex bg-white border border-neutral-200 rounded-[12px] p-[3px] shadow-xs">
            {tabs.map((tab) => {
              const tabType = tabToType[tab];
              const isActive = filter.type === tabType;
              return (
                <button
                  id={`transactions-tab-${tab.toLowerCase()}`}
                  key={tab}
                  onClick={() =>
                    setFilter((prev) => ({
                      ...prev,
                      type: tabType,
                    }))
                  }
                  className={`px-4 py-[10px] rounded-[6px] ${dm_sans.className} text-[14px] transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#D0BD21] text-black border-[1.2px] border-black shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Month dropdown */}
          <div className="relative">
            <button
              id="transactions-month-selector"
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
              className="flex items-center gap-1.5 text-[12px] font-bold text-neutral-600 bg-white border border-neutral-200 px-4 py-[12px] rounded-[10px] hover:bg-neutral-100 transition-colors cursor-pointer shadow-xs"
            >
              {formatMonthKey(filter.month)}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${
                  showMonthDropdown ? "rotate-180" : ""
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Dropdown */}
            {showMonthDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMonthDropdown(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-[160px] bg-white border border-neutral-200 rounded-[14px] shadow-lg z-50 py-1.5 max-h-[240px] overflow-y-auto scrollbar-none animate-fade-in">
                  <button
                    onClick={() => {
                      setFilter((prev) => ({ ...prev, month: "all" }));
                      setShowMonthDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[12px] font-semibold transition-colors cursor-pointer ${
                      filter.month === "all"
                        ? "bg-neutral-100 text-neutral-900 font-bold"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    All Months
                  </button>
                  {availableMonths.map((monthKey) => (
                    <button
                      key={monthKey}
                      onClick={() => {
                        setFilter((prev) => ({ ...prev, month: monthKey }));
                        setShowMonthDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[12px] font-semibold transition-colors cursor-pointer ${
                        filter.month === monthKey
                          ? "bg-neutral-100 text-neutral-900 font-bold"
                          : "text-neutral-600 hover:bg-neutral-50"
                      }`}
                    >
                      {formatMonthKey(monthKey)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-200/60" />
      </div>

      {/* ──── TRANSACTION LIST ──── */}
      <div className="flex-1 px-5 pt-5 pb-8">
        {isLoading ? (
          <div className="space-y-6">
            <TransactionSkeleton
              style={"mt-0"}
              number={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            />
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <p
              className={`text-[14px] font-bold text-neutral-400 ${dm_sans.className}`}
            >
              No transactions yet
            </p>
            <p className="text-[12px] text-neutral-400 mt-1">
              Your transaction history will appear here
            </p>
          </div>
        ) : sortedMonthKeys.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p
              className={`text-[14px] font-bold text-neutral-400 ${dm_sans.className}`}
            >
              No transactions found
            </p>
            <p className="text-[12px] text-neutral-400 mt-1">
              Try adjusting your filter settings
            </p>
          </div>
        ) : (
          <div className="space-y-6 min-w-0">
            {sortedMonthKeys.map((monthKey) => {
              const txns = grouped[monthKey];
              return (
                <div key={monthKey} className="space-y-3 min-w-0">
                  <h2
                    className={`text-[12px] font-bold text-neutral-400 uppercase tracking-wider ${dm_sans.className}`}
                  >
                    {formatMonthKey(monthKey)}
                  </h2>
                  <div className="space-y-3">
                    {txns.map((tx) => {
                      const formattedDate = formatDate(tx.created_at, "short");
                      const otherPartyName =
                        tx.type === "debit"
                          ? tx.accounts_to?.users?.name || "Unknown"
                          : tx.accounts_from?.users?.name || "Unknown";

                      const title =
                        tx.type === "debit"
                          ? `Transfer to ${otherPartyName}`
                          : `Transfer from ${otherPartyName}`;

                      return (
                        <div
                          key={tx.id}
                          onClick={() => router.push(`/transactions/${tx.id}`)}
                          className="bg-white border border-neutral-200/60 p-3.5 rounded-[18px] flex items-center justify-between shadow-xs hover:border-neutral-300 transition-colors cursor-pointer min-w-0"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 bg-neutral-100 text-neutral-600">
                              {tx.type === "debit" ? (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <line x1="7" y1="17" x2="17" y2="7" />
                                  <polyline points="7 7 17 7 17 17" />
                                </svg>
                              ) : (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <line x1="17" y1="7" x2="7" y2="17" />
                                  <polyline points="17 17 7 17 7 7" />
                                </svg>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[13px] truncate font-bold text-neutral-800 tracking-tight leading-tight">
                                {title}
                              </p>
                              <p className="text-[11px] text-neutral-400 font-semibold mt-1">
                                {formattedDate}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[13px] font-bold tracking-tight block text-neutral-800">
                              {tx.type === "debit" ? "-" : "+"}₵
                              {Math.abs(tx.amount).toFixed(0)}
                            </span>
                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-[6px] mt-1 bg-[#F0FDF4] text-[#16A34A]">
                              Successful
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div ref={bottomRef} className="h-1" />

        {isFetchingNextPage && (
          <p className="text-center text-xs text-neutral-400 py-4 font-semibold">
            Loading more...
          </p>
        )}
      </div>
    </div>
  );
}
