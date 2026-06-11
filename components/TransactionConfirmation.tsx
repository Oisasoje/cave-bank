import React from "react";
import { Inter, DM_Sans, Space_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface TransactionConfirmationProps {
  selectedRecipient: any;
  formattedRawAmount: string;
  formattedCharge: string;
  description: string;
  setStep: (step: number) => void;
}

const TransactionConfirmation = ({
  selectedRecipient,
  formattedRawAmount,
  formattedCharge,
  description,
  setStep,
}: TransactionConfirmationProps) => {
  return (
    <div className="animate-fade-in px-6 mt-6 flex flex-col">
      {/* Total Amount large centered display */}
      <div className="text-center mt-2 mb-6">
        <span className="text-[13px] font-semibold text-neutral-450 tracking-wider block uppercase mb-1">
          Total Amount
        </span>
        <div className="flex items-center justify-center gap-1">
          <span
            className={`text-[36px] font-bold text-neutral-850 ${space_mono.className}`}
          >
            ₵
          </span>
          <span
            className={`text-[36px] text-neutral-850 ${space_mono.className}`}
          >
            {formattedRawAmount}
          </span>
        </div>
      </div>

      {/* Confirmation Details Card */}
      <div className="bg-white border border-neutral-200/60 rounded-[20px] p-5 shadow-sm space-y-4">
        {/* Recipient Name */}
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-neutral-450 font-bold">Recipient Name</span>
          <span className="text-neutral-800 font-bold text-right">
            {selectedRecipient?.name && selectedRecipient.name.length > 17
              ? selectedRecipient.name.slice(0, 17) + "..."
              : selectedRecipient?.name}
          </span>
        </div>

        {/* Account Number */}
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-neutral-450 font-bold">Account Number</span>
          <span
            className={`text-neutral-800 font-bold text-right ${space_mono.className}`}
          >
            {selectedRecipient?.walletAddress}
          </span>
        </div>

        {/* Amount */}
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-neutral-450 font-bold">Amount</span>
          <span className="text-neutral-800 font-bold text-right">
            {formattedRawAmount}
          </span>
        </div>

        {/* Charge */}
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-neutral-450 font-bold">Charge</span>
          <span className="text-neutral-800 font-bold text-right">
            {formattedCharge}
          </span>
        </div>

        {/* Description (Note) */}
        <div className="pt-2 border-t border-neutral-100 flex flex-col">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
            Description
          </span>
          <div className="bg-[#F3F4F6] text-neutral-600 rounded-[10px] p-3 text-[13px] font-medium leading-relaxed">
            {description || "--"}
          </div>
        </div>
      </div>

      {/* Paying From Card */}
      <div className="mt-6">
        <span className="text-[13px] font-bold text-neutral-500 block mb-2">
          Paying From
        </span>
        <div className="bg-[#D0BD21] grainy border border-neutral-200/60 rounded-[16px] p-4 flex flex-col shadow-xs">
          <span className="text-[12px] text-neutral-450 font-bold uppercase tracking-wider">
            Wallet Balance
          </span>
          <span
            className={`text-[16px] font-bold text-neutral-850 mt-1 ${space_mono.className}`}
          >
            ₵ 500
          </span>
        </div>
      </div>

      {/* Confirm and send CTA Button */}
      <button
        type="button"
        onClick={() => setStep(4)} // Transition to step 4 Authorize PIN screen
        className="w-full h-[54px] rounded-[14px] bg-[#0E1719] text-white hover:bg-[#18262a] active:scale-[0.98] font-bold text-[14px] mt-8 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
      >
        Confirm and send
      </button>
    </div>
  );
};

export default TransactionConfirmation;
