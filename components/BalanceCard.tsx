"use client";

import { Space_Mono } from "next/font/google";

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
    <div className="grainy bg-[#ffdf41] rounded-[24px] p-6 text-neutral-900 shadow-md relative overflow-hidden flex flex-col justify-between h-[164px]">
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
            <div className="flex items-center ">
              <span>
                <svg width="32" height="32" viewBox="0 0 21 21" fill="none">
                  <path
                    d="M17.4868 12.459C17.289 13.8443 16.1179 14.8291 14.1013 15.3067C13.5182 15.4416 12.9167 15.5335 12.3063 15.5811C11.7925 15.6246 11.2754 15.6458 10.7579 15.6446C10.0618 15.6479 9.36683 15.6062 8.68179 15.5199C8.06651 15.4456 7.46755 15.316 6.8998 15.1344C4.65501 14.4051 3.51748 12.8459 3.51748 10.5C3.51748 8.15407 4.65501 6.59566 6.8998 5.86558C7.46818 5.68426 8.06739 5.55447 8.68287 5.47938C9.3677 5.394 10.0623 5.35252 10.7579 5.35543C11.2761 5.35459 11.7939 5.37579 12.3085 5.41892C12.9181 5.46663 13.5189 5.55858 14.1013 5.69326C16.1179 6.17091 17.2879 7.15493 17.4868 8.53951L17.5171 8.75114H20.9978L20.9697 8.4987C20.7102 6.14295 18.2578 4.21648 14.5446 3.435V0H12.0133V3.09868C10.9959 3.03627 9.97177 3.053 8.95969 3.14857V0H6.42403V3.59901C2.39617 4.67523 0 7.2426 0 10.5C0 13.7574 2.39617 16.3248 6.42403 17.401V21H8.95969V17.8492C9.97177 17.9447 10.9959 17.9615 12.0133 17.899V20.9977H14.5468V17.5635C18.2621 16.7828 20.7102 14.8563 20.9719 12.4998L21 12.2466H17.5193L17.4868 12.459Z"
                    fill="#0D1B1E"
                  />
                </svg>
              </span>
              <span className="text-4xl font-bold tracking-tight text-neutral-900">
                {formattedBalance.toFixed(2)}
              </span>
            </div>
          </>
        ) : (
          <div className="flex items-center">
            <span>
              <svg width="32" height="32" viewBox="0 0 21 21" fill="none">
                <path
                  d="M17.4868 12.459C17.289 13.8443 16.1179 14.8291 14.1013 15.3067C13.5182 15.4416 12.9167 15.5335 12.3063 15.5811C11.7925 15.6246 11.2754 15.6458 10.7579 15.6446C10.0618 15.6479 9.36683 15.6062 8.68179 15.5199C8.06651 15.4456 7.46755 15.316 6.8998 15.1344C4.65501 14.4051 3.51748 12.8459 3.51748 10.5C3.51748 8.15407 4.65501 6.59566 6.8998 5.86558C7.46818 5.68426 8.06739 5.55447 8.68287 5.47938C9.3677 5.394 10.0623 5.35252 10.7579 5.35543C11.2761 5.35459 11.7939 5.37579 12.3085 5.41892C12.9181 5.46663 13.5189 5.55858 14.1013 5.69326C16.1179 6.17091 17.2879 7.15493 17.4868 8.53951L17.5171 8.75114H20.9978L20.9697 8.4987C20.7102 6.14295 18.2578 4.21648 14.5446 3.435V0H12.0133V3.09868C10.9959 3.03627 9.97177 3.053 8.95969 3.14857V0H6.42403V3.59901C2.39617 4.67523 0 7.2426 0 10.5C0 13.7574 2.39617 16.3248 6.42403 17.401V21H8.95969V17.8492C9.97177 17.9447 10.9959 17.9615 12.0133 17.899V20.9977H14.5468V17.5635C18.2621 16.7828 20.7102 14.8563 20.9719 12.4998L21 12.2466H17.5193L17.4868 12.459Z"
                  fill="#0D1B1E"
                />
              </svg>
            </span>
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
