"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { DM_Sans, Space_Mono } from "next/font/google";
import Image from "next/image";
import { queryClient } from "@/lib/queryClient";
import { DBTransaction } from "../page";
import { formatDate } from "@/lib/formatDate";
import { useQuery } from "@tanstack/react-query";
import { getTransactionById } from "@/services/user";
import Loading from "@/components/Loading";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function TransactionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const txNumber = "260618180100560475886458";

  const handleCopy = () => {
    navigator.clipboard.writeText(txNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const infiniteData = queryClient.getQueryData<{
    pages: { data: DBTransaction[]; nextCursor?: string }[];
  }>(["transactions", "infinite"]);

  const cached = infiniteData?.pages
    .flatMap((page) => page.data)
    .find((t) => t.id === id);

  const { data: fetchedTransaction } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransactionById(id), // single-item endpoint
    enabled: !cached,
    initialData: cached,
  });

  const renderedTransaction = fetchedTransaction;

  if (!renderedTransaction) return <Loading />;

  return (
    <div
      className={`max-w-md mx-auto bg-white flex flex-col w-full min-h-dvh relative text-neutral-800 pb-6 select-none ${dm_sans.className}`}
    >
      {/* ──── STICKY HEADER ──── */}
      <div className="sticky top-0 z-30 bg-white px-5 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-[42px] h-[42px] bg-white rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 active:scale-95 duration-100 transition-colors shadow-xs cursor-pointer shrink-0"
            aria-label="Go back"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1F2937"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="text-[18px] font-bold text-neutral-800">
            Transaction Details
          </h1>
        </div>
      </div>

      {/* ──── MAIN CONTENT ──── */}
      <div className="flex-1 px-5 pt-3 space-y-4">
        {/* CARD 1: Transaction Summary */}
        <div className="bg-white border border-neutral-200/60 rounded-[24px] p-6 flex flex-col items-center relative shadow-xs">
          {/* Shop Front Circle Badge */}
          <div className="relative w-15 h-15 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-4 shadow-xs">
            <Image
              src="/cave-logo-black.png"
              alt="Cave Logo"
              width={100}
              height={100}
              className="rounded-full w-full h-full object-cover"
            />
          </div>

          {/* Title text */}
          <p className="text-[14px] text-neutral-400 font-medium tracking-wide">
            Transfer
            {renderedTransaction?.type === "debit"
              ? ` to ${renderedTransaction.accounts_to?.users.name}`
              : ` from ${renderedTransaction?.accounts_from?.users.name}`}
          </p>

          {/* Amount */}
          <div className="flex items-center justify-center mt-2 select-text">
            <span
              className={`text-[38px] font-bold text-[#D2B627] tracking-tightest leading-none inline-flex items-center gap-0.5 ${space_mono.className}`}
            >
              <Image
                src="/cave-coin-symbol-yellow.png"
                alt="cave-coin"
                width={40}
                height={40}
              />
              {renderedTransaction?.amount}
            </span>
          </div>

          {/* Successful Status */}
          <div className="flex items-center gap-1.5 bg-[#F0FDF4] px-3.5 py-1.5 rounded-full">
            <div className="w-4 h-4 rounded-full bg-[#16A34A] flex items-center justify-center">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F0FDF4"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-[13px] font-bold text-[#16A34A]">
              Successful
            </span>
          </div>
        </div>

        {/* CARD 2: Details Grid */}
        <div className="bg-white border border-neutral-200/60 rounded-[24px] p-6 space-y-5 shadow-xs">
          <h2 className="text-[15px] font-bold text-neutral-800">
            Transaction Details
          </h2>

          <div className="space-y-4 text-[13.5px]">
            {/* Recipient Details Row */}
            <div className="flex justify-between items-start">
              <span className="text-neutral-400 pt-0.5">{`${renderedTransaction?.type === "debit" ? "Recipient" : "Sender"} Details`}</span>
              <div className="text-right flex flex-col items-end">
                <span className="font-bold text-neutral-800">
                  {" "}
                  {renderedTransaction?.type === "debit"
                    ? `${renderedTransaction.accounts_to?.users.name}`
                    : `${renderedTransaction?.accounts_from?.users.name}`}
                </span>
                <span className="text-[11.5px] text-neutral-400 mt-0.5">
                  {renderedTransaction?.type === "debit"
                    ? `${renderedTransaction?.accounts_to.address}`
                    : `${renderedTransaction?.accounts_from.address}`}
                </span>
              </div>
            </div>

            {/* Transaction No. Row */}
            <div className="flex justify-between items-start">
              <span className="text-neutral-400 pt-0.5">Transaction No.</span>
              <div className="flex items-center gap-1 max-w-[65%]">
                <span
                  className={`text-right font-bold text-neutral-800 break-all leading-tight ${space_mono.className}`}
                >
                  {renderedTransaction?.id}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-neutral-100 rounded transition-colors text-neutral-400 hover:text-neutral-800 cursor-pointer"
                  title="Copy transaction number"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Transaction Date Row */}
            <div className="flex justify-between gap-3 items-center">
              <span className="text-neutral-400 text-nowrap">
                Transaction Date
              </span>
              <span className="font-bold break-all text-right text-neutral-800">
                {formatDate(renderedTransaction?.created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ──── BOTTOM BUTTONS ──── */}
      <div className="px-5 pt-4 pb-6 flex gap-4 shrink-0 bg-white">
        <button
          type="button"
          className="flex-1 h-[52px] rounded-[12px] bg-neutral-100 border border-neutral-200/60 text-neutral-700 font-bold text-[14px] hover:bg-neutral-200/50 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
        >
          Report Issue
        </button>
        <button
          type="button"
          className="flex-1 h-[52px] rounded-[12px] bg-[#0E1B1B] text-white font-bold text-[14px] hover:bg-black active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
        >
          Share Receipt
        </button>
      </div>
    </div>
  );
}
