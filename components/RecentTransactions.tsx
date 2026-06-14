import { DM_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import React from "react";
import TransactionSkeleton from "./TransactionsSkeleton";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const RecentTransactions = ({
  transactions,
  isLoading,
}: {
  transactions: any;
  isLoading: boolean;
}) => {
  const router = useRouter();

  if (isLoading)
    return (
      <div className="mt-8 flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-3">
          <div className="h-[13px] w-[140px] rounded bg-neutral-100 animate-pulse" />
          <div className="h-[13px] w-[48px] rounded bg-neutral-100 animate-pulse" />
        </div>
        <div className="space-y-3.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <TransactionSkeleton key={i} />
          ))}
        </div>
      </div>
    );

  return (
    <div className="mt-8 flex-1 flex flex-col min-h-0">
      <div className="flex justify-between items-center mb-3">
        <h3
          className={`text-[13px] text-neutral-400 font-bold uppercase tracking-wider ${dm_sans.className}`}
        >
          Recent Transactions
        </h3>
        <button
          onClick={() => router.push("/wallet/transactions")}
          className="text-xs font-bold text-neutral-800 hover:text-black flex items-center gap-0.5 cursor-pointer"
        >
          See all
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* List */}
      <div className="space-y-3.5 pb-6">
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
                    {`Transfer ${tx.type === "debit" ? ` to ${tx.accounts_to.users.name.slice(0, 12)}...` : ` from ${tx.accounts_from.users.name.slice(0, 12)}...`}`}
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
    </div>
  );
};

export default RecentTransactions;
