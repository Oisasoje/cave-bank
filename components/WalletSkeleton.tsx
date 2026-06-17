"use client";

import { Inter, DM_Sans } from "next/font/google";
import TransactionSkeleton from "./TransactionsSkeleton";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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

export default function WalletSkeleton() {
  return (
    <div
      className={`max-w-md mx-auto bg-neutral-50 flex flex-col w-full min-h-dvh relative ${inter.className} select-none pb-24 overflow-x-hidden`}
    >
      {/* HEADER */}
      <div className="pt-6 px-6 flex justify-between items-center bg-neutral-50 sticky top-0 z-30">
        <Shimmer className="h-[22px] w-[180px] rounded-md" />
        <Shimmer className="w-[42px] h-[42px] rounded-full" />
      </div>

      <div className="flex flex-col flex-1 px-6 mt-4">
        {/* BALANCE CARD */}
        <div className="bg-[#d2b627] rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between h-[164px] opacity-40">
          <div className="flex justify-between items-center">
            <Shimmer
              className="h-[11px] w-[110px] rounded"
              style={{ background: "rgba(13,27,30,0.2)" }}
            />
            <Shimmer
              className="w-[18px] h-[18px] rounded"
              style={{ background: "rgba(13,27,30,0.2)" }}
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Shimmer
              className="w-[30px] h-[30px] rounded"
              style={{ background: "rgba(13,27,30,0.2)" }}
            />
            <Shimmer
              className="w-[130px] h-[38px] rounded-md"
              style={{ background: "rgba(13,27,30,0.2)" }}
            />
          </div>
          <div className="flex items-center gap-2 border-t border-neutral-900/10 pt-3">
            <Shimmer
              className="h-[12px] w-[140px] rounded"
              style={{ background: "rgba(13,27,30,0.2)" }}
            />
            <Shimmer
              className="w-[14px] h-[14px] rounded"
              style={{ background: "rgba(13,27,30,0.2)" }}
            />
          </div>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div className="flex gap-4 mt-5">
          <Shimmer className="flex-1 h-[54px] rounded-[16px]" />
          <Shimmer className="flex-1 h-[54px] rounded-[16px]" />
        </div>

        {/* QUICK SEND */}
        <div className="mt-7">
          <Shimmer className={`h-[11px] w-[80px] rounded mb-3.5`} />
          <div className="flex gap-4 overflow-hidden pb-1">
            {/* Add button */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <Shimmer className="w-[58px] h-[58px] rounded-full" />
              <Shimmer className="w-[28px] h-[10px] rounded" />
            </div>
            {/* Contacts */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 shrink-0"
              >
                <Shimmer className="w-[58px] h-[58px] rounded-full" />
                <Shimmer className="w-[44px] h-[10px] rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="flex justify-between items-center mb-3">
          <Shimmer className="h-[11px] w-[130px] rounded" />
          <Shimmer className="h-[11px] w-[48px] rounded" />
        </div>
        <TransactionSkeleton />
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#12161A] rounded-[24px] p-2 flex items-center gap-1.5 shadow-xl w-[calc(100%-48px)] max-w-[380px]">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center justify-center py-2 px-1.5 gap-1"
          >
            <div className="w-[18px] h-[18px] rounded bg-neutral-700 animate-pulse" />
            <div className="w-[36px] h-[8px] rounded bg-neutral-700 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
