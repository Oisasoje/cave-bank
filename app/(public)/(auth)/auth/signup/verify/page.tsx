"use client";

import Keyboard from "@/components/Keyboard";
import ProgressBar from "@/components/ProgressBar";
import { signupVerify, sendOTP } from "@/services/auth";
import { Inter, DM_Sans, Space_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

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

export default function VerifySignup() {
  const router = useRouter();

  // Onboarding progress session state

  const [otp, setOtp] = useState("");
  const [focus, setFocus] = useState(true);
  const [errors, setErrors] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [hydrated, setHydrated] = useState(false);
  const [userID, setUserID] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    const signupAttemptID = sessionStorage.getItem("signupAttemptID");

    if (!storedEmail || !signupAttemptID) {
      router.replace("/auth/signup/start");
      return;
    }

    setEmail(storedEmail);
    setHydrated(true);
  }, [router]);

  // Countdown timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle number input from virtual keyboard
  const handleKey = (key: string) => {
    if (otp.length < 6) {
      setOtp((prev) => prev + key);
    }
  };

  // Handle delete
  const handleDelete = () => {
    setOtp((prev) => prev.slice(0, -1));
  };

  // Handle verification when 6 digits are complete
  useEffect(() => {
    if (otp.length === 6) {
      handleVerify();
    }
  }, [otp]);

  const handleVerify = async () => {
    setIsSubmitting(true);
    setErrors("");
    try {
      const signupAttemptID = sessionStorage.getItem("signupAttemptID") || "";
      // Call the API
      const result = await signupVerify(signupAttemptID, otp);
      const setupTokenID = result.data.setup_token_id;
      sessionStorage.setItem("setupTokenID", setupTokenID);
      router.push("/auth/signup/create-pin");
    } catch (error: any) {
      setErrors(error.message || "Invalid verification code.");
      setOtp("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsSubmitting(true);
    setErrors("");
    try {
      await sendOTP(userID);
      setOtp("");
      setTimer(20);
    } catch (error: any) {
      setErrors(error.message || "Invalid verification code.");
      setOtp("");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isSubmitting) {
    return <Loading />;
  }
  if (!hydrated) return null;
  return (
    <div
      className={`max-w-md mx-auto bg-white flex flex-col justify-between w-full min-h-dvh relative pb-10 ${inter.className} select-none`}
      onClick={() => setFocus(false)}
    >
      <div className="flex-1 pt-6 px-6 flex flex-col">
        <div className="mt-2">
          <ProgressBar currentStep={2} />
        </div>

        {/* Navigation Header */}
        <div className="flex justify-between items-center mt-5">
          <button
            onClick={() => router.back()}
            className="w-[42px] h-[42px] bg-white rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 active:scale-95 duration-100 transition-colors cursor-pointer shrink-0 shadow-xs"
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
            Verify Account
          </h1>
        </div>

        {/* Card: Check your email */}
        <div className="flex gap-4 p-4 bg-[#F3F4F6] rounded-[12px] mt-6">
          <div className="mt-0.5 text-neutral-800 shrink-0">
            {/* SVG Envelope Mail Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-bold text-neutral-900">
              Check your email
            </h3>
            <p
              onClick={() => {
                window.open(
                  "https://mail.google.com/mail/u/0/#inbox",
                  "_blank",
                );
              }}
              className={`text-[13px] text-neutral-500 mt-1 leading-normal font-medium ${dm_sans.className}`}
            >
              A verification code was sent to the email{" "}
              <span className="text-neutral-900 font-semibold">{email}</span>{" "}
              linked to your Cave profile.{" "}
              <span className="text-neutral-900 font-semibold underline cursor-pointer hover:text-black">
                Go to email.
              </span>
            </p>
          </div>
        </div>

        {/* OTP Input Slots */}
        <div
          className="flex gap-2.5 mt-8 justify-between cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setFocus(true);
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => {
            const digit = otp[index] || "";
            const isCurrent = otp.length === index;
            return (
              <div
                key={index}
                className={`w-[48px] h-[54px] bg-[#F3F4F6] rounded-[10px] flex items-center justify-center transition-all ${
                  isCurrent && focus
                    ? "border-2 border-amber-500 ring-1 ring-amber-500 bg-white"
                    : digit
                      ? "border border-neutral-300 bg-white"
                      : "border border-neutral-200"
                }`}
              >
                <span
                  className={`text-[20px] font-bold text-neutral-900 ${space_mono.className}`}
                >
                  {digit}
                </span>
                {isCurrent && focus && (
                  <span className="w-[1.5px] h-[20px] bg-neutral-900 ml-0.5 animate-blink" />
                )}
              </div>
            );
          })}
        </div>

        {/* Error Messaging */}
        <div className="h-5 mt-3 flex items-center">
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
        </div>

        {/* Action Button: Resend */}
        <div className="mt-2">
          <button
            disabled={timer > 0 || isSubmitting}
            onClick={(e) => {
              e.stopPropagation();
              handleResend();
            }}
            className={`w-full h-[52px] ${dm_sans.className} rounded-[12px] font-semibold text-[15px] flex items-center justify-center select-none transition-colors ${
              timer > 0 || isSubmitting
                ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                : "bg-[#0E1B1B] text-white hover:bg-black cursor-pointer"
            }`}
          >
            {isSubmitting
              ? "Verifying..."
              : timer > 0
                ? `Resend Code in ${timer}s`
                : "Resend Code"}
          </button>
        </div>
      </div>

      {/* On-screen Custom iOS-style Numeric Keyboard */}
      {focus && <Keyboard onKey={handleKey} onDelete={handleDelete} />}
    </div>
  );
}
