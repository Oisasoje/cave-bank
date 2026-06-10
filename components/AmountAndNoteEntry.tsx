import { DM_Sans, Space_Mono } from "next/font/google";
import React from "react";
import Keyboard from "./Keyboard";
import { Beneficiary } from "@/app/wallet/send/page";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const AmountAndNoteEntry = ({
  selectedRecipient,
  handleSendCoins,
  setStep,
  description,
  setDescription,
  amountDigits,
  formatAmount,
  handleKey,
  handleDelete,
}: {
  selectedRecipient: Beneficiary | null;
  handleSendCoins: (e: React.FormEvent) => void;
  setStep: (step: number) => void;
  description: string;
  setDescription: (description: string) => void;
  amountDigits: string;
  setAmountDigits: (amountDigits: string) => void;
  formatAmount: (amountDigits: string) => string;
  handleKey: (digit: string) => void;
  handleDelete: () => void;
}) => {
  return (
    <div className="animate-fade-in flex flex-col flex-1 overflow-y-auto pb-[280px]">
      <div className="px-6 mt-6 flex flex-col">
        {/* Sending to Recipient card */}
        <div className="mb-2">
          <span className="text-[13px] font-bold text-neutral-500 block mb-2">
            Sending to
          </span>
          <div className="bg-[#C4A61A] rounded-[16px] p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3.5">
              {
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-neutral-800 shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              }
              <div>
                <p className="text-[14px] font-bold text-neutral-900 leading-tight">
                  {selectedRecipient?.name}
                </p>
                <p
                  className={`text-[11px] text-neutral-900/80 font-semibold mt-1 ${space_mono.className}`}
                >
                  {selectedRecipient?.walletAddress}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-3.5 py-1.5 bg-white border border-neutral-800/10 rounded-[8px] text-[12px] font-bold text-neutral-850 hover:bg-neutral-50 transition-colors shadow-xs active:scale-95 duration-100 cursor-pointer"
            >
              Change
            </button>
          </div>
        </div>

        {/* From Wallet Balance card */}
        <div className="mt-4 mb-4">
          <span className="text-[13px] font-bold text-neutral-500 block mb-2">
            From
          </span>
          <div className="bg-[#EAEAEA] border border-neutral-250/30 rounded-[16px] p-4 flex flex-col shadow-xs">
            <span className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider">
              Wallet Balance
            </span>
            <span
              className={`text-[18px] font-bold text-neutral-850 mt-1.5 ${space_mono.className}`}
            >
              ₵ 500
            </span>
          </div>
        </div>

        {/* Amount and Notes Input Box Card */}
        <div className="bg-white border border-neutral-200/60 rounded-[20px] p-5 shadow-sm space-y-4">
          {/* Amount */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
              Amount
            </label>
            <div className="w-full h-[56px] border border-neutral-200 rounded-[14px] px-4 flex items-center bg-white">
              <span className="text-[14px] font-bold text-neutral-800 mr-1 select-none">
                ₵
              </span>
              <span
                className={`text-[14px] font-semibold tracking-tight ${
                  amountDigits ? "text-neutral-900" : "text-neutral-350"
                }`}
              >
                {amountDigits ? formatAmount(amountDigits) : "1.00 - 533.00"}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
              Description
            </label>
            <input
              type="text"
              maxLength={50}
              placeholder="Add a note (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-[56px] border border-neutral-200 rounded-[14px] px-4 text-[14px] focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white placeholder-neutral-400 font-medium transition-all shadow-xs"
            />
            <span className="text-[10px] text-neutral-400 font-semibold mt-1.5 block">
              {description.length}/50
            </span>
          </div>
        </div>

        {/* Send Transfer CTA Button */}
        <button
          type="button"
          onClick={handleSendCoins}
          disabled={!amountDigits}
          className={`w-full h-[54px] rounded-[14px] font-bold text-[14px] mt-6 mb-4 flex items-center justify-center transition-all duration-200 ${
            amountDigits
              ? "bg-[#0E1719] text-white hover:bg-[#18262a] active:scale-[0.98] cursor-pointer shadow-md"
              : "bg-[#EAEAEA] text-neutral-450 cursor-not-allowed"
          }`}
        >
          Send Cave Coins
        </button>
      </div>

      {/* Fixed Keyboard */}
      <Keyboard onKey={handleKey} onDelete={handleDelete} />
    </div>
  );
};
