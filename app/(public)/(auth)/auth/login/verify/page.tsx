"use client";
import Keyboard from "@/components/Keyboard";
import Loading from "@/components/Loading";
import generateUserData from "@/lib/getUserData";
import { loginVerify } from "@/services/auth";
import { Inter, DM_Sans, Space_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "700"],
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "700"],
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Verify = () => {
  const router = useRouter();

  useEffect(() => {
    const loginAttemptID = sessionStorage.getItem("loginAttemptID");
    if (!loginAttemptID) {
      setTimeout(() => {
        router.push("/auth/start");
      }, 3000);
    }
  }, []);
  const [digits, setDigits] = useState("");
  const [focus, setFocus] = useState(true);
  const [errors, setErrors] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPin, setShowPin] = useState<boolean>(false);

  const isDisabled = digits.length < 4 || isSubmitting;

  const handleKey = (key: string) => {
    if (!focus) return;
    if (digits.length < 4) {
      const newDigits = digits + key;
      setDigits(newDigits);
    }
  };

  const handleDelete = () => {
    const newDigits = digits.slice(0, -1);
    setDigits(newDigits);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors("");

    try {
      const loginAttemptID = sessionStorage.getItem("loginAttemptID");
      if (!loginAttemptID) {
        throw new Error("You cannot proceed. Please try logging in again.");
      }

      await loginVerify(loginAttemptID, digits);
      await generateUserData();

      window.location.href = "/wallet";
    } catch (error: any) {
      setErrors(error.message);
      setIsSubmitting(false);
      setFocus(true);
      if (!sessionStorage.getItem("loginAttemptID")) {
        setTimeout(() => router.push("/auth/login/start"), 3000);
      }
    }
  };

  if (isSubmitting) {
    return <Loading />;
  }

  return (
    <div
      className={`max-w-md mx-auto bg-white flex flex-col justify-between w-full min-h-dvh ${inter.className}`}
      onClick={() => setFocus(false)}
    >
      <div className="flex-1 pt-10 px-6 flex flex-col">
        {/* Welcome Header */}
        <div className="mt-6">
          <h1 className="text-[28px] font-bold text-neutral-900 tracking-tight leading-tight">
            Hello, Caveman!
          </h1>
          <p
            className={`text-[15px] text-neutral-500 mt-2 font-normal ${dm_sans.className}`}
          >
            Enter your PIN to login to your account
          </p>
        </div>

        {/* PIN Input Box with Red Border Error State */}
        <div
          className={`flex items-center border ${focus ? "border-amber-500" : errors ? "border-red-500" : "border-neutral-200"} rounded-[10px] px-4 h-[48px] bg-white mt-8 justify-between`}
          onClick={(e) => {
            e.stopPropagation();
            setFocus(true);
          }}
        >
          <div className="flex items-center gap-3">
            {/* Lock Icon */}
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

            {/* Masked PIN Dots (Static) */}
            <div
              className={`flex items-center font-semibold gap-1.5 mt-0.5 ${space_mono.className}`}
            >
              <span className="text-[15px] font-medium tracking-wide text-neutral-900">
                {showPin
                  ? digits
                  : Array.from({ length: digits.length }, () => "•")}
              </span>
              {/* Fake cursor */}
              {focus && (
                <span
                  className="w-[1.5px] h-[18px] bg-neutral-900 ml-0.5"
                  style={{ animation: "blink 1s step-end infinite" }}
                />
              )}
            </div>
          </div>

          {/* Eye Icon (Visibility Toggle) */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer"
            onClick={() => setShowPin(!showPin)}
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>

        {/* Error Message and Forgot PIN Row */}

        {/* Error Message */}
        <div className="flex items-center h-5 gap-1.5 text-red-500">
          {/* Error Warning Icon */}

          {errors && (
            <>
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
              <span className="text-[12px] font-semibold text-red-500">
                {errors}
              </span>
            </>
          )}
        </div>

        {/* Forgot PIN Link */}
        <div className="flex justify-end">
          <span
            className={`text-neutral-500 mt-3 text-[13px] ${dm_sans.className} font-semibold hover:text-neutral-800 cursor-pointer`}
          >
            Forgot PIN?
          </span>
        </div>

        {/* Login Button */}
        <button
          disabled={isDisabled}
          onClick={handleSubmit}
          className={`w-full h-[54px] ${dm_sans.className} ${
            isDisabled
              ? "bg-neutral-200 text-neutral-400 opacity-50 cursor-not-allowed"
              : "bg-black text-white cursor-pointer"
          } rounded-[10px] font-semibold text-[15px] flex items-center justify-center mt-3 select-none transition-colors`}
        >
          {isSubmitting ? "Verifying..." : "Login"}
        </button>

        {/* Change Phone Option */}
        <div className="flex-1 flex flex-col items-center mt-6">
          <p className={`text-[14px] text-neutral-500 ${dm_sans.className}`}>
            Not your account?{" "}
            <span className="text-neutral-900 font-semibold cursor-pointer hover:underline">
              Change Phone Number
            </span>
          </p>
        </div>
      </div>

      {/* Full-width Keyboard at bottom */}
      {focus && <Keyboard onKey={handleKey} onDelete={handleDelete} />}
    </div>
  );
};

export default Verify;
