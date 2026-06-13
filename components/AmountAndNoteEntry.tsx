"use client";

import { DM_Sans, Space_Mono } from "next/font/google";
import React, { useEffect, useState } from "react";
import Keyboard from "./Keyboard";
import { Beneficiary } from "@/app/wallet/send/page";
import Image from "next/image";

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
  formattedBalance,
  handleSendCoins,
  setStep,
  description,
  setDescription,
  amountDigits,
  formatAmount,
  handleKey,
  handleDelete,
}: {
  formattedBalance: number;
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
  const [focus, setFocus] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setFocus(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const digits = amountDigits.replace(/,/g, "");
    if (Number(digits) > Number(formattedBalance)) {
      console.log(Number(digits), Number(formattedBalance));
      setError("Insufficient balance");
    } else {
      setError(null);
    }
  }, [amountDigits]);

  return (
    <div
      className="animate-fade-in flex flex-col flex-1"
      onClick={() => setFocus(false)}
      onScroll={() => setFocus(false)}
    >
      <div className="px-6 mt-6 flex flex-col">
        {/* Sending to Recipient card */}
        <div className="mb-2">
          <span className="text-[13px] font-bold text-neutral-500 block mb-2">
            Sending to
          </span>
          <div className="bg-[#D0BD21] w-full grainy rounded-[16px] p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3.5">
              <div>
                <p
                  className={`text-[15px] font-bold text-black leading-tight ${dm_sans.className}`}
                >
                  {selectedRecipient?.name && selectedRecipient.name.length > 17
                    ? selectedRecipient.name.slice(0, 17) + "..."
                    : selectedRecipient?.name}
                </p>
                <p
                  className={`text-[15px] text-black/90 font-semibold mt-1 ${space_mono.className}`}
                >
                  {selectedRecipient?.walletAddress}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setStep(1);
              }}
              className={`px-3.5 ${space_mono.className} py-1.5 bg-white border-2 border-neutral-400 rounded-[8px] text-[12px] font-bold text-neutral-850 hover:bg-neutral-50 transition-colors shadow-xs active:scale-95 duration-100 cursor-pointer`}
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
          <div className="bg-[#EAEAEA] grainy border border-neutral-250/30 rounded-[16px] p-4 flex flex-col shadow-xs">
            <span className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider">
              Wallet Balance
            </span>
            <span
              className={`text-[18px] font-bold text-neutral-850 mt-1.5 ${space_mono.className}`}
            >
              {formattedBalance}
            </span>
          </div>
        </div>

        {/* Amount and Notes Input Box Card */}
        <div className="bg-white border border-neutral-200/60 rounded-[20px] p-5 shadow-sm flex flex-col  space-y-4">
          {/* Amount */}
          <div
            className={`w-full h-[56px] mb-[7px] border rounded-[14px] px-4 flex items-center bg-white transition-all ${
              focus
                ? "border-amber-500 shadow-[0_0_0_1px_#F59E0B]"
                : "border-neutral-200 hover:border-neutral-300"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setFocus(true);
            }}
          >
            <span
              className={`text-[5px] font-bold text-neutral-800 mr-1 select-none ${space_mono.className}`}
            >
              <Image
                src="/cave-coin-symbol-black.png"
                alt="cave-coin"
                width={8}
                height={5}
              />
            </span>

            {/* cursor when focused and empty */}
            {focus && !amountDigits && (
              <span
                className="w-[1.5px] h-[16px] bg-neutral-900 shrink-0"
                style={{ animation: "blink 1s step-end infinite" }}
              />
            )}

            <span
              className={`text-[14px] font-semibold tracking-tight ${
                amountDigits ? "text-neutral-900" : "text-neutral-400"
              } ${space_mono.className}`}
            >
              {amountDigits ? (
                <>
                  {formatAmount(amountDigits)}
                  {/* cursor after digits when focused */}
                  {focus && (
                    <span
                      className="inline-block w-[1.5px] h-[16px] bg-neutral-900 ml-0.5 shrink-0 align-middle"
                      style={{ animation: "blink 1s step-end infinite" }}
                    />
                  )}
                </>
              ) : (
                <span className="text-neutral-400">1.00 - 10000.00</span>
              )}
            </span>
          </div>
          <span className="h-4 text-red-500 text-sm font-semibold">
            {error}
          </span>

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
              onFocus={() => setFocus(false)}
              onClick={(e) => {
                e.stopPropagation();
                setFocus(false);
              }}
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
          disabled={!amountDigits || error !== null}
          className={`w-full h-[54px] rounded-[14px] font-bold text-[14px] mt-6 mb-4 flex items-center justify-center transition-all duration-200 ${
            amountDigits && error === null
              ? "bg-[#0E1719] text-white hover:bg-[#18262a] active:scale-[0.98] cursor-pointer shadow-md"
              : "bg-[#EAEAEA] text-neutral-450 cursor-not-allowed"
          }`}
        >
          Send
        </button>
      </div>

      {/* Fixed Keyboard */}
      {focus && (
        <Keyboard
          setError={setError}
          digits={amountDigits}
          onKey={handleKey}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
