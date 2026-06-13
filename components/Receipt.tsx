"use client";

import { DM_Sans, Space_Mono } from "next/font/google";
import React, { useRef } from "react";
import Image from "next/image";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useRouter } from "next/navigation";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export interface ReceiptProps {
  transactionResult: any;

  onShareImage?: () => void;
  onSharePdf?: () => void;
}

const Receipt = ({
  transactionResult,
  onShareImage = () => console.log("Share as image clicked"),
  onSharePdf = () => console.log("Share as PDF clicked"),
}: ReceiptProps) => {
  const router = useRouter();

  const formattedDate = new Date(transactionResult.transaction.created_at)
    .toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(" at ", ", ");
  // → "Saturday, June 13, 2026, 4:01 AM"

  const receiptRef = useRef<HTMLDivElement>(null);

  const shareAsImage = async () => {
    if (!receiptRef.current) return;

    const dataUrl = await toPng(receiptRef.current, { cacheBust: true });

    const link = document.createElement("a");
    link.download = `receipt-${transactionResult.transaction.reference}.png`;
    link.href = dataUrl;
    link.click();
  };

  const shareAsPDF = async () => {
    if (!receiptRef.current) return;

    const dataUrl = await toPng(receiptRef.current, { cacheBust: true });

    const pdf = new jsPDF({ format: "a4", unit: "px" });
    const width = pdf.internal.pageSize.getWidth();
    const height =
      (receiptRef.current.offsetHeight * width) /
      receiptRef.current.offsetWidth;

    pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
    pdf.save(`receipt-${transactionResult.transaction.reference}.pdf`);
  };

  return (
    <div
      ref={receiptRef}
      className={`max-w-md mx-auto bg-[#F5F6F6] flex flex-col w-full relative select-none overflow-y-auto max-h-dvh pb-8 ${dm_sans.className}`}
    >
      {/* 1. TOP HEADER BAR */}

      {/* RECEIPT MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col bg-white">
        {/* 2. THE CAVE BANK BANNER */}
        <div className="w-full fixed top-0 bg-[#0D1B1E] grainy px-6 py-4.5 flex items-center justify-between text-white shrink-0 shadow-sm">
          {/* Logo & Name */}
          <div className="flex items-center gap-2">
            {/* Styled Cave Bank Logo Mark */}
            <div className="relative w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#D2B627] select-none shrink-0">
              <Image
                src="/cave-coin-symbol-yellow.png"
                alt="Cave Bank Logo"
                width={40}
                height={40}
              />
            </div>
            <span className="text-[15px] font-bold tracking-tight">
              The <span className="text-[#D2B627]">Cave</span> Bank
            </span>
          </div>
          {/* Transaction Receipt text */}
          <span className="text-[12px] font-medium text-neutral-300">
            Transaction Receipt
          </span>
        </div>

        {/* 3. RECEIPT BODY CARD (WHITE WITH FLOATING WATERMARKS) */}
        <div className="flex-1 relative px-6 pt-8 pb-10 flex flex-col overflow-hidden">
          {/* Floating Yellow Watermark Coins matching the mockup layout */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Top-Left Coin - small, slow float */}
            <div className="absolute top-[8%] left-[6%] animate-float-slow opacity-[0.06] rotate-12">
              <Image
                src="/cave-coin-symbol-yellow.png"
                alt="Cave Coin"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>

            {/* Top-Right Coin - medium, offset */}
            <div className="absolute top-[12%] right-[10%] animate-float-medium opacity-[0.06] -rotate-12">
              <Image
                src="/cave-coin-symbol-yellow.png"
                alt="Cave Coin"
                width={26}
                height={26}
                className="object-contain"
              />
            </div>

            {/* Center-Left Coin */}
            <div className="absolute top-[48%] left-[8%] animate-float-fast opacity-[0.05] rotate-45">
              <Image
                src="/cave-coin-symbol-yellow.png"
                alt="Cave Coin"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>

            {/* Mid-Right Coin */}
            <div className="absolute top-[52%] right-[8%] animate-float-slow-reverse opacity-[0.05] -rotate-45">
              <Image
                src="/cave-coin-symbol-yellow.png"
                alt="Cave Coin"
                width={34}
                height={34}
                className="object-contain"
              />
            </div>

            {/* Bottom-Left Coin */}
            <div className="absolute bottom-[20%] left-[22%] animate-float-medium opacity-[0.05] rotate-12">
              <Image
                src="/cave-coin-symbol-yellow.png"
                alt="Cave Coin"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          </div>

          {/* Amount and Timestamp */}
          <div className="flex flex-col items-center z-10">
            {/* Large Amount */}
            <div className="flex items-center justify-center mt-2 select-text">
              <span
                className={`text-[38px] font-bold text-[#D2B627] tracking-tight leading-none ${space_mono.className}`}
              >
                C {transactionResult.transaction.amount}
              </span>
              <span
                className={`text-[38px] font-bold text-[#D2B627] tracking-tight leading-none ml-0.5 ${space_mono.className}`}
              >
                {transactionResult.amount}
              </span>
            </div>

            {/* Date Time */}
            <p className="text-[12px] text-neutral-500 font-semibold mt-3 tracking-wide select-text">
              {formattedDate}
            </p>
          </div>

          {/* Transaction details grid */}
          <div className="mt-8 space-y-5.5 z-10 select-text">
            {/* Row 1: Transaction Type */}
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium text-neutral-500">
                Transaction Type
              </span>
              <span className="text-[14px] font-bold text-neutral-900">
                Transfer
              </span>
            </div>

            {/* Row 2: Transaction Status */}
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium text-neutral-500">
                Transaction Status
              </span>
              <span
                className={`px-2.5 py-0.5 text-[11px] font-bold rounded-[6px] tracking-wide bg-[#E6F4EA] text-[#2A7A4C]`}
              >
                Successful
              </span>
            </div>

            {/* Row 3: Recipient Details */}
            <div className="flex justify-between items-start">
              <span className="text-[13px] font-medium text-neutral-500 pt-0.5">
                Recipient Details
              </span>
              <div className="text-right flex flex-col">
                <span className="text-[14px] font-bold text-neutral-900 leading-tight">
                  {transactionResult.receiverUserName}
                </span>
                <span
                  className={`text-[11.5px] text-neutral-500 mt-1 font-semibold ${space_mono.className}`}
                >
                  {transactionResult.transaction.to_address}
                </span>
              </div>
            </div>

            {/* Row 4: Sender Details */}
            <div className="flex justify-between items-start">
              <span className="text-[13px] font-medium text-neutral-500 pt-0.5">
                Sender Details
              </span>
              <div className="text-right flex flex-col">
                <span className="text-[14px] font-bold text-neutral-900 leading-tight">
                  {transactionResult.senderUserName}
                </span>
                <span
                  className={`text-[11.5px] text-neutral-500 mt-1 font-semibold ${space_mono.className}`}
                >
                  {transactionResult.transaction.from_address}
                </span>
              </div>
            </div>

            {/* Row 5: Description */}
            <div className="flex justify-between items-start">
              <span className="text-[13px] font-medium text-neutral-500 pt-0.5">
                Description
              </span>
              <span className="text-[14px] font-bold text-neutral-900 text-right max-w-[200px] leading-snug">
                {transactionResult.transaction.reason || "No description"}
              </span>
            </div>

            {/* Row 6: Transaction No. */}
            <div className="flex justify-between items-start">
              <span className="text-[13px] font-medium text-neutral-500 pt-0.5">
                Transaction No.
              </span>
              <span className="text-[14px] font-bold text-neutral-900 text-right break-all max-w-[200px] leading-snug">
                {transactionResult.transaction.reference}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM ACTION CTA BUTTONS SECTION */}
      <div className="bg-[#F5F6F6] px-6 pt-5 pb-8 flex flex-col gap-3.5 shrink-0 z-20">
        <button
          type="button"
          onClick={shareAsImage}
          className="w-full h-[54px] rounded-[14px] bg-[#0E1719] text-white hover:bg-[#18262a] active:scale-[0.98] font-bold text-[14px] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
        >
          Share as image
        </button>
        <button
          type="button"
          onClick={shareAsPDF}
          className="w-full h-[54px] rounded-[14px] bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50 active:scale-[0.98] font-bold text-[14px] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs"
        >
          Share as PDF
        </button>
        <div className="flex justify-end w-full ">
          <button
            type="button"
            onClick={() => router.replace("/wallet")}
            className="w-full h-[54px] rounded-[14px] border border-neutral-200 bg-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 active:scale-[0.98] font-bold text-[14px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
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
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Go to Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
