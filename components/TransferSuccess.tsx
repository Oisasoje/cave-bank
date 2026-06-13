import { Beneficiary } from "@/app/wallet/send/page";
import { DM_Sans, Space_Mono } from "next/font/google";
import React from "react";
import ConfettiAnimation from "./Confetti";
import { useRouter } from "next/navigation";
import Image from "next/image";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const TransferSuccess = ({
  selectedRecipient,
  formattedRawAmount,

  setStep,
  successDate,
  handleResetFlow,
}: {
  selectedRecipient: Beneficiary | null;
  formattedRawAmount: string;

  setStep: (step: number) => void;
  successDate: string;
  handleResetFlow: () => void;
}) => {
  const router = useRouter();

  const formattedDate = new Date(successDate).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  // → "Saturday, June 13, 2026 at 4:01 AM"

  return (
    <div className="animate-fade-in px-6 mt-6 flex flex-col flex-1">
      <ConfettiAnimation />
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Animated Concentric Rings & Sparkles Illustration */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Green circle with checkmark */}
          <div className="relative w-20 h-20 rounded-full bg-[#7CA88D] flex items-center justify-center shadow-md">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Sparkle SVGs matching the mockup layout */}
          <svg
            className="absolute top-4 right-4 w-4 h-4 text-[#D2B627]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
          </svg>
          <svg
            className="absolute top-8 left-4 w-5 h-5 text-[#D2B627]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
          </svg>
          <svg
            className="absolute bottom-12 left-2 w-4 h-4 text-[#D2B627]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
          </svg>
          <svg
            className="absolute bottom-6 right-6 w-5 h-5 text-[#D2B627]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
          </svg>
        </div>

        {/* Transfer Successful Header */}
        <h2
          className={`text-[19px] font-bold text-neutral-850 mt-8 mb-2 ${dm_sans.className}`}
        >
          Transfer Successful
        </h2>

        {/* Detailed description */}
        <p className="text-[13px] text-neutral-600 text-center max-w-[280px] leading-relaxed">
          You have successfully transferred{" "}
          <span
            className={`font-bold text-neutral-850 text-[16px] inline-flex items-center gap-1 ${space_mono.className}`}
          >
            <Image
              src="/cave-coin-symbol-black.png"
              alt="cave-coin"
              width={9}
              height={9}
            />
            {formattedRawAmount}
          </span>{" "}
          to{" "}
          <span className="text-neutral-800 font-bold uppercase">
            {selectedRecipient?.name}
          </span>
        </p>

        {/* Dynamic safe timestamp */}
        <p className="text-[11px] text-neutral-450 font-semibold mt-4">
          {formattedDate}
        </p>
      </div>

      {/* Action CTA Buttons */}
      <div className="space-y-3 w-full pb-8 pt-6 shrink-0">
        <button
          type="button"
          onClick={() => {
            setStep(6);
          }}
          className="w-full h-[54px] rounded-[14px] bg-[#0E1719] text-white hover:bg-[#18262a] active:scale-[0.98] font-bold text-[14px] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
        >
          Share Receipt
        </button>
        <button
          type="button"
          onClick={() => {
            handleResetFlow();
            router.push("/wallet");
          }}
          className="w-full h-[54px] rounded-[14px] bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50 active:scale-[0.98] font-bold text-[14px] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TransferSuccess;
