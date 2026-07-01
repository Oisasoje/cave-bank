"use client";

import ConfettiAnimation from "@/components/Confetti";
import Keyboard from "@/components/Keyboard";
import { changePin, verifyPin } from "@/services/auth";
import { Inter, DM_Sans, Space_Mono } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const space_mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

function PinBar({
  label,
  value,
  isActive,
  showValue,
  onToggleShow,
  onFocus,
  error,
}: {
  label: string;
  value: string;
  isActive: boolean;
  showValue: boolean;
  onToggleShow: () => void;
  onFocus: () => void;
  error?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label
        className={`text-[13px] font-semibold text-neutral-800 ${dm_sans.className}`}
      >
        {label}
      </label>

      {/* Input row */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onFocus();
        }}
        className={`flex items-center border rounded-[10px] px-4 h-[48px] bg-white justify-between cursor-pointer transition-colors ${
          error
            ? "border-red-500"
            : isActive
              ? "border-amber-500"
              : "border-neutral-200"
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Lock icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>

          {/* Dots + cursor */}
          <div
            className={`flex items-center gap-1.5 mt-0.5 ${space_mono.className}`}
          >
            <span className="text-[15px] font-medium tracking-wide text-neutral-900">
              {showValue
                ? value
                : Array.from({ length: value.length }, () => "•")}
            </span>
            {isActive && (
              <span
                className="w-[1.5px] h-[18px] bg-neutral-900 ml-0.5"
                style={{ animation: "blink 1s step-end infinite" }}
              />
            )}
          </div>
        </div>

        {/* Eye toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleShow();
          }}
          className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 cursor-pointer"
          aria-label="Toggle PIN visibility"
        >
          {showValue ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
              <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Step 1: verify current PIN (4-box style) ─────────────────────────────────
function StepOne({
  onVerified,
  onBack,
}: {
  onVerified: () => void;
  onBack: () => void;
}) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleKey = (key: string) => {
    if (pin.length < 4) setPin((p) => p + key);
  };
  const handleDelete = () => {
    setPin((p) => p.slice(0, -1));
    setError("");
  };

  const handleContinue = async () => {
    try {
      if (pin.length < 4 || isSubmitting) return;
      setIsSubmitting(true);
      setError("");

      await verifyPin(pin);

      onVerified();
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = pin.length < 4 || isSubmitting;
  const router = useRouter();
  return (
    <div
      className={`max-w-md mx-auto bg-white flex flex-col w-full min-h-dvh ${inter.className} select-none`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-4 shrink-0 bg-white z-10">
        <button
          onClick={() => router.back()}
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
        <h1
          className={`text-[18px] font-bold text-neutral-850 tracking-tight ${dm_sans.className}`}
        >
          Change Pin
        </h1>
      </div>

      <div className="flex-1 px-6 pt-2 flex flex-col items-center overflow-y-auto pb-[280px] scrollbar-none">
        <h1
          className={`text-[24px] font-bold text-neutral-900 tracking-tight leading-tight text-center ${dm_sans.className}`}
        >
          Enter Transaction Pin
        </h1>
        <p
          className={`text-[14px] text-neutral-500 mt-2 font-normal leading-snug text-center ${dm_sans.className}`}
        >
          Enter your current transaction pin to proceed
        </p>

        {/* 4-box PIN input */}
        <div className="flex gap-2.5 mt-8 justify-center">
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = pin.length > idx;
            const isBoxActive = pin.length === idx;
            return (
              <div
                key={idx}
                className={`w-[48px] h-[54px] bg-[#F3F4F6] rounded-[10px] flex items-center justify-center transition-all ${
                  error
                    ? "border-2 border-red-500 ring-1 ring-red-500 bg-white"
                    : isBoxActive
                      ? "border-2 border-amber-500 ring-1 ring-amber-500 bg-white"
                      : isFilled
                        ? "border border-neutral-300 bg-white"
                        : "border border-neutral-200"
                }`}
              >
                {isFilled ? (
                  <span className="text-[20px] font-bold text-neutral-900 mt-1 select-none">
                    *
                  </span>
                ) : isBoxActive ? (
                  <span className="w-[1.5px] h-[20px] bg-neutral-900 ml-0.5 animate-blink" />
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Forgot PIN */}
        <div className="flex justify-center mt-6 w-full">
          <Link
            href="/account/reset-pin"
            className={`text-[13px] font-semibold text-[#D2B627] hover:opacity-80 transition-opacity cursor-pointer ${dm_sans.className}`}
          >
            Forgot PIN?
          </Link>
        </div>

        {/* Continue */}
        <div className="mt-6 w-full">
          <button
            disabled={isDisabled}
            onClick={handleContinue}
            className={`w-full h-[52px] ${dm_sans.className} rounded-[10px] font-semibold text-[15px] flex items-center justify-center transition-colors ${
              isDisabled
                ? "bg-neutral-200 text-neutral-400 opacity-50 cursor-not-allowed"
                : "bg-black text-white hover:bg-neutral-800 cursor-pointer active:scale-[0.99]"
            }`}
          >
            {isSubmitting ? "Verifying..." : "Continue"}
          </button>
        </div>
      </div>

      <Keyboard onKey={handleKey} onDelete={handleDelete} />

      <style jsx global>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// ── Step 2: set new PIN ───────────────────────────────────────────────────────
function StepTwo({
  onSave,
  onCancel,
}: {
  onSave: () => void;
  onCancel: () => void;
}) {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [activeField, setActiveField] = useState<"new" | "confirm">("new");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleKey = (key: string) => {
    if (activeField === "new") {
      if (newPin.length < 4) {
        const next = newPin + key;
        setNewPin(next);
        if (next.length === 4) setActiveField("confirm");
      }
    } else {
      if (confirmPin.length < 4) setConfirmPin((p) => p + key);
    }
  };

  const handleDelete = () => {
    if (activeField === "confirm") {
      if (confirmPin.length === 0) {
        setActiveField("new");
      } else {
        setConfirmPin((p) => p.slice(0, -1));
      }
    } else {
      setNewPin((p) => p.slice(0, -1));
    }
  };

  const pinsMatch =
    newPin.length === 4 && confirmPin.length === 4 && newPin === confirmPin;
  const pinsMismatch =
    newPin.length === 4 && confirmPin.length === 4 && newPin !== confirmPin;
  const isDisabled = !pinsMatch || isSubmitting;

  const handleSave = async () => {
    try {
      if (isDisabled) return;
      setIsSubmitting(true);
      await changePin(newPin);
      setIsSubmitting(false);
      toast.success("PIN changed successfully");
      onSave();
    } catch (error: any) {
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`max-w-md mx-auto bg-white flex flex-col w-full min-h-dvh ${inter.className} select-none`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-4 shrink-0 bg-white z-10">
        <button
          onClick={onCancel}
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
        <h1
          className={`text-[18px] font-bold text-neutral-900 tracking-tight ${dm_sans.className}`}
        >
          Change Pin
        </h1>
      </div>

      <div className="flex-1 px-6 pt-2 flex flex-col overflow-y-auto pb-[280px] scrollbar-none">
        <h1
          className={`text-[24px] font-bold text-neutral-900 tracking-tight leading-tight ${dm_sans.className}`}
        >
          Create a new PIN
        </h1>
        <p
          className={`text-[14px] text-neutral-500 mt-2 font-normal leading-snug ${dm_sans.className}`}
        >
          Choose a 4-digit PIN you'll be using for your transactions going
          forward.
        </p>

        {/* PIN fields */}
        <div className="mt-6 space-y-4">
          <PinBar
            label="New PIN"
            value={newPin}
            isActive={activeField === "new"}
            showValue={showNew}
            onToggleShow={() => setShowNew((v) => !v)}
            onFocus={() => setActiveField("new")}
          />
          <PinBar
            label="Confirm new PIN"
            value={confirmPin}
            isActive={activeField === "confirm"}
            showValue={showConfirm}
            onToggleShow={() => setShowConfirm((v) => !v)}
            onFocus={() => setActiveField("confirm")}
            error={pinsMismatch}
          />
        </div>

        {/* Match / mismatch feedback */}
        <div className="h-5 mt-2 flex items-center">
          {pinsMismatch && (
            <span className="text-[12px] font-semibold text-red-500 flex items-center gap-1">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              PINs do not match
            </span>
          )}
          {pinsMatch && (
            <span className="text-[12px] font-semibold text-emerald-600 flex items-center gap-1">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l3 3 5-5" />
              </svg>
              PINs match
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-4 space-y-3">
          <button
            disabled={isDisabled}
            onClick={handleSave}
            className={`w-full h-[52px] ${dm_sans.className} rounded-[10px] font-semibold text-[15px] flex items-center justify-center transition-all ${
              isDisabled
                ? "bg-neutral-200 text-neutral-400 opacity-50 cursor-not-allowed"
                : "bg-black text-white hover:bg-neutral-800 cursor-pointer active:scale-[0.99]"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>

          <button
            onClick={onCancel}
            className={`w-full h-[52px] ${dm_sans.className} rounded-[10px] font-semibold text-[15px] flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer`}
          >
            Cancel
          </button>
        </div>
      </div>

      <Keyboard onKey={handleKey} onDelete={handleDelete} />

      <style jsx global>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// ── Step 3: Success ───────────────────────────────────────────────────────────
function StepSuccess({ onDone }: { onDone: () => void }) {
  return (
    <div
      className={`max-w-md mx-auto bg-white flex flex-col items-center justify-center w-full min-h-dvh px-12 ${inter.className} select-none`}
    >
      <ConfettiAnimation />
      <div className="w-[72px] h-[72px] rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l3 3 5-5" />
        </svg>
      </div>
      <h1
        className={`text-[24px] font-bold text-neutral-900 tracking-tight text-center ${dm_sans.className}`}
      >
        PIN Updated!
      </h1>
      <p
        className={`text-[14px] text-neutral-500 mt-2 text-center leading-relaxed ${dm_sans.className}`}
      >
        Your transaction PIN has been changed successfully.
      </p>
      <button
        onClick={onDone}
        className={`w-full h-[52px] ${dm_sans.className} rounded-[10px] font-semibold text-[15px] flex items-center justify-center bg-black text-white hover:bg-neutral-800 cursor-pointer active:scale-[0.99] transition-all mt-10`}
      >
        Done
      </button>
    </div>
  );
}

// ── Root page ─────────────────────────────────────────────────────────────────
export default function ChangePinPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  if (step === 1) {
    return (
      <StepOne onVerified={() => setStep(2)} onBack={() => router.back()} />
    );
  }

  if (step === 2) {
    return (
      <StepTwo
        onSave={() => {
          // TODO: call API once endpoint is available
          setStep(3);
        }}
        onCancel={() => setStep(1)}
      />
    );
  }

  return <StepSuccess onDone={() => router.back()} />;
}
