"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inter, DM_Sans } from "next/font/google";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTransactions } from "@/services/user";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type TransactionStatus = "Pending" | "Successful" | "Failed";
type TransactionType = "debit" | "credit";
type FilterTab = "All" | "Sent" | "Received";

interface MockTransaction {
  id: string;
  type: TransactionType;
  recipientName: string;
  date: string; // ISO string
  amount: number;
  status: TransactionStatus;
}

const MOCK_TRANSACTIONS: MockTransaction[] = [
  // Today (June 14, 2026)
  {
    id: "1",
    type: "debit",
    recipientName: "Catherine Onyeulo",
    date: "2026-06-14T10:04:00",
    amount: 20,
    status: "Pending",
  },
  {
    id: "2",
    type: "debit",
    recipientName: "Catherine Onyeulo",
    date: "2026-06-14T10:04:00",
    amount: 20,
    status: "Successful",
  },
  {
    id: "3",
    type: "debit",
    recipientName: "Catherine Onyeulo",
    date: "2026-06-14T10:04:00",
    amount: 20,
    status: "Failed",
  },
  // May 14, 2026
  {
    id: "4",
    type: "debit",
    recipientName: "Catherine Onyeulo",
    date: "2026-05-14T10:04:00",
    amount: 20,
    status: "Failed",
  },
  {
    id: "5",
    type: "credit",
    recipientName: "Catherine Onyeulo",
    date: "2026-05-14T10:04:00",
    amount: 20,
    status: "Successful",
  },
  {
    id: "6",
    type: "debit",
    recipientName: "Catherine Onyeulo",
    date: "2026-05-14T10:04:00",
    amount: 20,
    status: "Failed",
  },
  {
    id: "7",
    type: "credit",
    recipientName: "Catherine Onyeulo",
    date: "2026-05-14T10:04:00",
    amount: 20,
    status: "Successful",
  },
  // May 13, 2026
  {
    id: "8",
    type: "debit",
    recipientName: "Catherine Onyeulo",
    date: "2026-05-13T10:04:00",
    amount: 20,
    status: "Successful",
  },
  {
    id: "9",
    type: "credit",
    recipientName: "Catherine Onyeulo",
    date: "2026-05-13T14:22:00",
    amount: 50,
    status: "Successful",
  },
  // May 10, 2026
  {
    id: "10",
    type: "debit",
    recipientName: "Ayomide Olanrewaju",
    date: "2026-05-10T09:15:00",
    amount: 35,
    status: "Successful",
  },
  {
    id: "11",
    type: "credit",
    recipientName: "Victor Oluwaseun",
    date: "2026-05-10T16:40:00",
    amount: 100,
    status: "Pending",
  },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function groupByDate(
  transactions: MockTransaction[],
): Record<string, MockTransaction[]> {
  const groups: Record<string, MockTransaction[]> = {};
  for (const tx of transactions) {
    const key = new Date(tx.date).toDateString();
    if (!groups[key]) groups[key] = [];
    groups[key].push(tx);
  }
  return groups;
}

export default function TransactionsPage() {
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["transactions", "infinite"],
      queryFn: ({ pageParam }) => getTransactions({ pageParam, limit: 20 }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });
  const transactions = data?.pages.flatMap((page) => page.data) ?? [];

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

  console.log(transactions);

  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [selectedMonth, setSelectedMonth] = useState("May");
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((tx) => {
      if (activeTab === "Sent") return tx.type === "debit";
      if (activeTab === "Received") return tx.type === "credit";
      return true;
    });
  }, [activeTab]);

  const grouped = useMemo(
    () => groupByDate(filteredTransactions),
    [filteredTransactions],
  );

  const sortedDateKeys = useMemo(() => {
    return Object.keys(grouped).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    );
  }, [grouped]);

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
            {tabs.map((tab) => (
              <button
                id={`transactions-tab-${tab.toLowerCase()}`}
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-[7px] rounded-[6px] ${dm_sans.className} text-[14px] transition-all duration-200 cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#D0BD21] text-black border-[1.2px] border-black  shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Month dropdown */}
          <div className="relative">
            <button
              id="transactions-month-selector"
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
              className="flex items-center gap-1.5 text-[12px] font-bold text-neutral-600 bg-white border border-neutral-200 px-3.5 py-[7px] rounded-[10px] hover:bg-neutral-100 transition-colors cursor-pointer shadow-xs"
            >
              {selectedMonth}
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
                  {MONTHS.map((month) => (
                    <button
                      key={month}
                      onClick={() => {
                        setSelectedMonth(month);
                        setShowMonthDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[12px] font-semibold transition-colors cursor-pointer ${
                        selectedMonth === month
                          ? "bg-neutral-100 text-neutral-900 font-bold"
                          : "text-neutral-600 hover:bg-neutral-50"
                      }`}
                    >
                      {month}
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
        {transactions.length === 0 ? (
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
        ) : (
          <div className="space-y-6">
            {transactions?.map((tx: any) => {
              const formattedDate = new Date(tx.created_at)
                .toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(" at ", ", ");
              return (
                <div
                  key={tx.id}
                  className="bg-white border border-neutral-200/60 p-3.5 rounded-[18px] flex items-center justify-between shadow-xs hover:border-neutral-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 ${
                        tx.type === "debit"
                          ? "bg-neutral-100 text-neutral-600"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
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
                    <div>
                      <p className="text-[13px] font-bold text-neutral-800 tracking-tight leading-tight">
                        {`Transfer ${tx.type === "debit" ? ` to ${tx.accounts_to.users.name.slice(0, 12)}...` : ` from ${tx.accounts_from.users.name.slice(0, 10)}...`}`}
                      </p>
                      <p className="text-[11px] text-neutral-400 font-semibold mt-1">
                        {formattedDate}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[13px] font-bold tracking-tight block ${
                        tx.type === "debit"
                          ? "text-neutral-800"
                          : "text-neutral-800"
                      }`}
                    >
                      {tx.type === "debit" ? "-" : "+"}₵
                      {Math.abs(tx.amount).toFixed(0)}
                    </span>
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-[6px] mt-1 ${"bg-[#F0FDF4] text-[#16A34A]"}`}
                    >
                      Successful
                    </span>
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
