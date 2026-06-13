"use client";

import { useState, useEffect } from "react";
import { Inter, DM_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import RecipientSelection from "@/components/RecipientSelection";
import { AmountAndNoteEntry } from "@/components/AmountAndNoteEntry";
import TransactionConfirmation from "@/components/TransactionConfirmation";
import AuthorizeTransaction from "@/components/AuthorizeTransaction";
import TransferSuccess from "@/components/TransferSuccess";
import { getBalance } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import Receipt from "@/components/Receipt";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export interface Beneficiary {
  accountId: string;
  name: string | null;
  walletAddress: string;
}

export default function SendCoinsPage() {
  const router = useRouter();
  const { data: balance } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });
  const formattedBalance = balance?.data.balance.toFixed(2);
  const [step, setStep] = useState(1);

  const [selectedRecipient, setSelectedRecipient] =
    useState<Beneficiary | null>(null);

  // Transaction details (Step 2, 3, 4 & 5)
  const [amountDigits, setAmountDigits] = useState("");
  const [description, setDescription] = useState("");
  const [pin, setPin] = useState("");
  const [transactionResult, setTransactionResult] = useState<any>(null);

  // Toast Alert states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Unified Custom Keyboard input router
  const handleKey = (digit: string) => {
    if (step === 2) {
      if (amountDigits.length >= 10) return;
      if (amountDigits === "" && digit === "0") return; // Avoid leading zero
      setAmountDigits((prev) => prev + digit);
    } else if (step === 4) {
      if (pin.length >= 4) return;
      const newPin = pin + digit;
      setPin(newPin);
      // if (newPin.length === 4) {
      //   setStep(5); // Go to Step 5 Success screen
      // }
    }
  };

  const handleDelete = () => {
    if (step === 2) {
      setAmountDigits((prev) => prev.slice(0, -1));
    } else if (step === 4) {
      setPin((prev) => prev.slice(0, -1));
    }
  };

  // Format digit string into ATM-style currency format (e.g. 500 becomes 5.00)
  const formatAmount = (digits: string) => {
    if (!digits) return "0.00";
    const value = parseInt(digits, 10);
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Get raw float value of the entered amount
  const getRawAmountValue = () => {
    if (!amountDigits) return 0;
    return parseInt(amountDigits, 10);
  };

  const handleSendCoins = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountDigits) return;
    setStep(3); // Transition to Confirmation Screen
  };

  const handleResetFlow = () => {
    setStep(1);
    setSelectedRecipient(null);
    setAmountDigits("");
    setDescription("");
    setPin("");
    setTransactionResult(null);
    router.push("/wallet");
  };

  const handleBack = () => {
    if (step === 5) {
      handleResetFlow();
    } else if (step === 4) {
      setStep(3);
      setPin("");
    } else if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
      setAmountDigits("");
    } else {
      router.push("/wallet");
    }
  };

  // Dynamic calculations for Step 3 & 5
  const rawAmount = getRawAmountValue();
  const transactionCharge = rawAmount * 0.0; // 0% charge

  // Formatting displays
  const formattedRawAmount = rawAmount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  const formattedCharge = transactionCharge.toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

  return (
    <div
      className={`max-w-md mx-auto bg-[#F9F9F9] flex flex-col w-full h-screen relative ${
        inter.className
      } select-none overflow-x-hidden ${
        step === 2 || step === 4 ? "overflow-hidden" : "overflow-y-auto pb-8"
      }`}
    >
      {/* Toast Alert popup */}
      {showToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white text-[13px] px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-neutral-800 transition-all animate-bounce">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#EAB308"
            strokeWidth="2.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div
        className={`${step === 6 ? "pt-0" : "pt-6"} px-6 flex items-center justify-between bg-[#F9F9F9] sticky top-0 z-30`}
      >
        {step !== 6 && (
          <button
            onClick={handleBack}
            className="w-[42px] h-[42px] bg-white rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors shadow-xs cursor-pointer active:scale-95 duration-100"
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
        )}
        <h1
          className={`text-[18px] font-bold text-neutral-850 tracking-tight ${dm_sans.className}`}
        >
          {step === 4 || step === 5
            ? "Authorize Transaction"
            : step === 3
              ? "Confirm Transaction"
              : step !== 6 && "Send Cave Coins"}
        </h1>
        <div className="w-[42px]" /> {/* Spacer to center the header title */}
      </div>

      {step === 1 && (
        /* STEP 1: RECIPIENT SELECTION */
        <RecipientSelection
          selectedRecipient={selectedRecipient}
          setSelectedRecipient={setSelectedRecipient}
          setStep={setStep}
        />
      )}

      {step === 2 && (
        /* STEP 2: AMOUNT & NOTES ENTRY */
        <AmountAndNoteEntry
          selectedRecipient={selectedRecipient}
          handleSendCoins={handleSendCoins}
          setStep={setStep}
          amountDigits={amountDigits}
          setAmountDigits={setAmountDigits}
          description={description}
          setDescription={setDescription}
          handleKey={handleKey}
          handleDelete={handleDelete}
          formatAmount={formatAmount}
          formattedBalance={formattedBalance}
        />
      )}

      {step === 3 && (
        /* STEP 3: TRANSACTION CONFIRMATION */
        <TransactionConfirmation
          selectedRecipient={selectedRecipient}
          formattedRawAmount={formattedRawAmount}
          formattedCharge={formattedCharge}
          description={description}
          setStep={setStep}
          formattedBalance={formattedBalance}
        />
      )}

      {step === 4 && (
        /* STEP 4: AUTHORIZE TRANSACTION (PIN ENTRY) */
        <AuthorizeTransaction
          setStep={setStep}
          pin={pin}
          selectedRecipient={selectedRecipient}
          amount={rawAmount}
          reason={description}
          handleKey={handleKey}
          setTransactionResult={setTransactionResult}
          handleDelete={handleDelete}
          triggerToast={triggerToast}
        />
      )}

      {step === 5 && (
        /* STEP 5: TRANSFER SUCCESSFUL STATE */
        <TransferSuccess
          selectedRecipient={selectedRecipient}
          formattedRawAmount={formattedRawAmount}
          setStep={setStep}
          handleResetFlow={handleResetFlow}
          successDate={transactionResult.transaction.created_at}
        />
      )}

      {step === 6 && (
        /* STEP 6: RECEIPT */
        <Receipt transactionResult={transactionResult} />
      )}
    </div>
  );
}
