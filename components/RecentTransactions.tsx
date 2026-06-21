import { DM_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import TransactionSkeleton from "./TransactionsSkeleton";
import { formatDate } from "@/lib/formatDate";

function Shimmer({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`animate-pulse bg-neutral-200 ${className}`}
      style={style}
    />
  );
}

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const RecentTransactions = ({
  showBalance,
  transactions,
  isLoading,
}: {
  showBalance: boolean;
  transactions: any;
  isLoading: boolean;
}) => {
  const router = useRouter();

  if (isLoading && showBalance) {
    return (
      <div
        className={`${showBalance ? "mt-8 flex-1 flex flex-col min-h-0 opacity-100" : "h-0 overflow-hidden opacity-0"} transition-all duration-300`}
      >
        <div className="flex justify-between items-center mb-3">
          <Shimmer className="h-[11px] w-[130px] rounded" />
          <Shimmer className="h-[11px] w-[48px] rounded" />
        </div>
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
  }
  return (
    <div
      className={`${showBalance ? "flex-1 flex flex-col h-full opacity-100" : "h-0 overflow-hidden opacity-0"} mt-8 transition-all duration-300`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3
          className={`text-[13px] text-neutral-400 font-bold uppercase tracking-wider ${dm_sans.className}`}
        >
          Recent Transactions
        </h3>
        <button
          onClick={() => router.push("/transactions")}
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
      <div className="space-y-3.5 pb-6 min-w-0">
        {!transactions || transactions.length === 0 ? (
          <div className="text-center py-8 bg-white border border-neutral-200/60 rounded-[18px] shadow-xs">
            <p className="text-neutral-500 font-semibold text-[13px] leading-relaxed">
              You have no recent transactions.
            </p>
          </div>
        ) : (
          transactions.map((tx: any) => {
            const formattedDate = formatDate(tx.created_at, "short");
            return (
              <div
                key={tx.id}
                onClick={() => router.push(`/transactions/${tx.id}`)}
                className="bg-white border border-neutral-200/60 p-3.5 rounded-[18px] flex items-center justify-between shadow-xs hover:border-neutral-300 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
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
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-neutral-800 tracking-tight leading-tight min-w-0 truncate">
                      {`Transfer ${
                        tx.type === "debit"
                          ? `to ${tx.accounts_to.users.name}`
                          : `from ${tx.accounts_from.users.name}`
                      }`}
                    </p>
                    <p className="text-[11px] text-neutral-400 font-semibold mt-1 min-w-0 truncate">
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
          })
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
