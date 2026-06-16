"use client";

import { Space_Mono } from "next/font/google";
import Image from "next/image";

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function BalanceCard({
  showBalance,
  setShowBalance,
  walletAddress,
  handleCopyId,
  copied,
  formattedBalance,
}: {
  showBalance: boolean;
  setShowBalance: (value: boolean) => void;
  walletAddress: string;
  handleCopyId: () => void;
  copied: boolean;
  formattedBalance: number;
}) {
  return (
    <div className="grainy bg-[#ffdf41] rounded-[24px] p-6 text-neutral-900 relative overflow-hidden flex flex-col justify-between h-[164px]">
      {/* Top row: balance label & hide toggle */}
      <div className="flex justify-between items-center">
        <span className="text-[11px] text-neutral-900/70 font-semibold uppercase tracking-wider">
          Available balance
        </span>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="text-neutral-900/80 hover:text-neutral-900 cursor-pointer p-1"
        >
          {showBalance ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          )}
        </button>
      </div>

      {/* Middle row: Large Amount */}
      <div className={`mt-2 flex items-baseline ${space_mono.className}`}>
        {showBalance ? (
          <>
            <div className="flex items-center">
              <Image
                src="/cave-coin-symbol-black.png"
                alt="₵"
                width={32}
                height={32}
                priority
                className="w-8 h-8 object-contain shrink-0"
              />
              <span className="text-4xl font-bold tracking-tight text-neutral-900">
                {formattedBalance.toFixed(2)}
              </span>
            </div>
          </>
        ) : (
          <div className="flex items-center">
            <Image
              src="/cave-coin-symbol-black.png"
              alt="₵"
              width={32}
              height={32}
              priority
              className="w-8 h-8 object-contain shrink-0"
            />
            <span className="text-4xl font-bold tracking-tight leading-none text-neutral-900">
              ••••
            </span>
          </div>
        )}
      </div>

      {/* Bottom row: Card Account ID */}
      <div className="flex items-center justify-between border-t border-neutral-900/10 pt-3">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-[12px] font-semibold text-neutral-900/80 uppercase ${space_mono.className}`}
          >
            {walletAddress}
          </span>
          <button
            onClick={handleCopyId}
            className="p-1 hover:bg-neutral-900/10 rounded transition-colors cursor-pointer"
            title="Copy Account ID"
          >
            {copied ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16A34A"
                strokeWidth="3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
