import { useRouter } from "next/navigation";
import React from "react";

const WalletPageQuickActions = () => {
  const router = useRouter();
  return (
    <div className="flex gap-4 mt-5">
      <button
        onClick={() => router.push("/wallet/send")}
        className="flex-1 h-[54px] bg-[#0E1719] hover:bg-[#18262a] active:scale-98 text-white rounded-[16px] font-bold text-[14px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
      >
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
        Send
      </button>
      <button
        onClick={() => router.push("/wallet/request")}
        className="flex-1 h-[54px] bg-white border border-neutral-200 hover:border-neutral-300 active:scale-98 text-neutral-800 rounded-[16px] font-bold text-[14px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
      >
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
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
        Request
      </button>
    </div>
  );
};

export default WalletPageQuickActions;
