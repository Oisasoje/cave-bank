"use client";

import Keyboard from "@/components/Keyboard";
import ProgressBar from "@/components/ProgressBar";
import generateUserData from "@/lib/getUserData";
import { createPin } from "@/services/auth";
import { Inter, DM_Sans, Space_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function CreatePin() {
  const router = useRouter();

  // Page states
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [activeField, setActiveField] = useState<"pin" | "confirmPin">("pin");
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [focus, setFocus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const signupAttemptID = sessionStorage.getItem("signupAttemptID");
    if (!signupAttemptID) {
      router.replace("/auth/signup/start");
      return;
    }
    setHydrated(true);
  }, [router]);

  useEffect(() => {
    if (pin.length === 4 && activeField === "pin") {
      setActiveField("confirmPin");
      setFocus(true);
    }
  }, [pin]); // ✅ only runs when pin changes, not when activeField changes

  const handleKey = (key: string) => {
    if (activeField === "pin") {
      if (pin.length < 4) {
        setPin((prev) => prev + key);
      }
    } else {
      if (confirmPin.length < 4) {
        setConfirmPin((prev) => prev + key);
      }
    }
  };

  const handleDelete = () => {
    if (activeField === "pin") {
      setPin((prev) => prev.slice(0, -1));
    } else {
      setConfirmPin((prev) => prev.slice(0, -1));
    }
  };

  const isValid =
    pin.length === 4 && confirmPin.length === 4 && pin === confirmPin;
  const isDisabled = !isValid || isSubmitting;

  const handleSubmit = async () => {
    if (isDisabled) return;

    setIsSubmitting(true);
    setErrors("");

    try {
      const setupTokenID = sessionStorage.getItem("setupTokenID") || "";
      if (!setupTokenID) throw new Error();
      await createPin(setupTokenID, pin);

      await generateUserData();
      router.push("/auth/signup/congratulations");
    } catch (err: any) {
      setErrors(err.message || "Failed to set PIN. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hydrated) return null;

  return (
    <div
      className={`max-w-md mx-auto bg-white flex flex-col justify-between w-full min-h-screen relative pb-10 ${inter.className} select-none`}
      onClick={() => setFocus(false)}
    >
      <div className="flex-1 pt-6 px-6 flex flex-col">
        <div className="mt-2">
          <ProgressBar currentStep={3} />
        </div>

        {/* Navigation Header */}
        <div className="flex justify-between items-center mt-5">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-start text-neutral-800 hover:text-black cursor-pointer transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => alert("Help Center is under construction.")}
            className="text-[14px] text-neutral-800 font-medium hover:underline cursor-pointer"
          >
            Help
          </button>
        </div>

        {/* Title */}
        <div className="mt-6">
          <h1
            className={`text-[24px] ${dm_sans.className} font-bold text-neutral-900 tracking-tight leading-tight`}
          >
            Create Your Pin
          </h1>
          <p
            className={`text-[15px] text-neutral-500 mt-2 font-normal ${dm_sans.className}`}
          >
            Create a 4 digit pin you will use to login
          </p>
        </div>

        {/* Inputs */}
        <div className="mt-8 space-y-6">
          {/* Field 1: New PIN */}
          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-neutral-800">
              New pin
            </label>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setActiveField("pin");
                setFocus(true);
              }}
              className={`flex items-center justify-between border rounded-[10px] px-4 h-[48px] bg-white cursor-pointer transition-all ${
                activeField === "pin" && focus
                  ? "border-amber-500 shadow-[0_0_0_1px_#F59E0B]"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center gap-1.5 h-full">
                {showPin ? (
                  <div className="flex items-center">
                    <span
                      className={`text-[15px] font-medium tracking-wide text-neutral-900 ${space_mono.className}`}
                    >
                      {pin}
                    </span>
                    {activeField === "pin" && focus && (
                      <span
                        className="w-[1.5px] h-[18px] bg-neutral-900 ml-1"
                        style={{ animation: "blink 1s step-end infinite" }}
                      />
                    )}
                  </div>
                ) : (
                  <div className="flex gap-1.5 items-center">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <React.Fragment key={i}>
                        {/* Cursor BEFORE first dot when empty */}
                        {activeField === "pin" &&
                          focus &&
                          pin.length === 0 &&
                          i === 0 && (
                            <span
                              className="w-[1.5px] h-[18px] bg-neutral-900"
                              style={{
                                animation: "blink 1s step-end infinite",
                              }}
                            />
                          )}
                        <span
                          className={`text-[24px] leading-none ${i < pin.length ? "text-neutral-900" : "text-neutral-300"}`}
                        >
                          •
                        </span>
                        {/* Cursor AFTER last filled dot */}
                        {activeField === "pin" &&
                          focus &&
                          pin.length > 0 &&
                          i === pin.length - 1 && (
                            <span
                              className="w-[1.5px] h-[18px] bg-neutral-900"
                              style={{
                                animation: "blink 1s step-end infinite",
                              }}
                            />
                          )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPin(!showPin);
                }}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-1"
              >
                {/* Eye Icon */}
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
                  {showPin ? (
                    <>
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" y1="2" x2="22" y2="22" />
                    </>
                  ) : (
                    <>
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Field 2: Confirm PIN / New PIN label */}
          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-neutral-800">
              Confirm pin
            </label>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setActiveField("confirmPin");
                setFocus(true);
              }}
              className={`flex items-center justify-between border rounded-[10px] px-4 h-[48px] bg-white cursor-pointer transition-all ${
                activeField === "confirmPin" && focus
                  ? "border-amber-500 shadow-[0_0_0_1px_#F59E0B]"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center gap-1.5 h-full">
                {showConfirmPin ? (
                  <div className="flex items-center">
                    <span
                      className={`text-[15px] font-medium tracking-wide text-neutral-900 ${space_mono.className}`}
                    >
                      {confirmPin}
                    </span>
                    {activeField === "confirmPin" && focus && (
                      <span
                        className="w-[1.5px] h-[18px] bg-neutral-900 ml-1"
                        style={{ animation: "blink 1s step-end infinite" }}
                      />
                    )}
                  </div>
                ) : (
                  <div className="flex gap-1.5 items-center">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <React.Fragment key={i}>
                        {/* Cursor BEFORE first dot when empty */}
                        {activeField === "confirmPin" &&
                          focus &&
                          confirmPin.length === 0 &&
                          i === 0 && (
                            <span
                              className="w-[1.5px] h-[18px] bg-neutral-900"
                              style={{
                                animation: "blink 1s step-end infinite",
                              }}
                            />
                          )}
                        <span
                          className={`text-[24px] leading-none ${i < confirmPin.length ? "text-neutral-900" : "text-neutral-300"}`}
                        >
                          •
                        </span>
                        {/* Cursor AFTER last filled dot */}
                        {activeField === "confirmPin" &&
                          focus &&
                          confirmPin.length > 0 &&
                          i === confirmPin.length - 1 && (
                            <span
                              className="w-[1.5px] h-[18px] bg-neutral-900"
                              style={{
                                animation: "blink 1s step-end infinite",
                              }}
                            />
                          )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirmPin(!showConfirmPin);
                }}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-1"
              >
                {/* Eye Icon */}
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
                  {showConfirmPin ? (
                    <>
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" y1="2" x2="22" y2="22" />
                    </>
                  ) : (
                    <>
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Error message */}
        <div className="h-6 mt-4 flex items-center">
          {errors && (
            <span className="text-[12px] font-semibold text-red-500 flex items-center gap-1">
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
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {errors}
            </span>
          )}
          {!errors &&
            pin.length === 4 &&
            confirmPin.length === 4 &&
            pin !== confirmPin && (
              <span className="text-[12px] font-semibold text-red-500 flex items-center gap-1">
                PINs do not match.
              </span>
            )}
        </div>

        {/* Continue Button */}
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`w-full h-[54px] ${dm_sans.className} rounded-[10px] font-semibold text-[15px] flex items-center justify-center select-none transition-colors ${
              !isDisabled
                ? "bg-[#0E1B1B] text-white hover:bg-black cursor-pointer"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Saving PIN..." : "Continue"}
          </button>
        </div>
      </div>

      {/* Custom iOS-style Numeric Keyboard */}
      {focus && <Keyboard onKey={handleKey} onDelete={handleDelete} />}
    </div>
  );
}
