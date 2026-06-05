"use client";

import { signupStart } from "@/services/auth";
import ProgressBar from "@/components/ProgressBar";
import CountrySelector from "@/components/CountrySelector";
import type { Country } from "@/components/CountrySelector";
import { Inter, DM_Sans, Space_Mono } from "next/font/google";
import { useState } from "react";
import { AsYouType, isValidPhoneNumber } from "libphonenumber-js";
import { useRouter } from "next/navigation";
import Keyboard from "@/components/Keyboard";
import { allCountryFlags, CountryCode, SquareFlag } from "react-square-flags";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function EnterPhonePage() {
  const router = useRouter();

  // State
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: "NG",
    name: "Nigeria",
    dialCode: "+234",
  });
  const [digits, setDigits] = useState("");
  const [formatted, setFormatted] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [focus, setFocus] = useState(true);
  const [toggleKeyboard, setToggleKeyboard] = useState(true);
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [errors, setErrors] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate number & checkbox
  let isValid = false;
  try {
    isValid =
      digits.length > 0 &&
      isValidPhoneNumber(
        selectedCountry.dialCode + digits,
        selectedCountry.code,
      );
  } catch (error) {
    isValid = false;
  }

  const isDisabled = !isValid || !agreed || isSubmitting;

  // Virtual Keyboard Input Handlers
  const handleKey = (key: string) => {
    if (!focus) return;
    const newDigits = digits + key;
    setDigits(newDigits);

    const formatter = new AsYouType(selectedCountry.code);
    setFormatted(formatter.input(newDigits));
  };

  const handleDelete = () => {
    const newDigits = digits.slice(0, -1);
    setDigits(newDigits);

    if (newDigits.length === 0) {
      setFormatted("");
    } else {
      const formatter = new AsYouType(selectedCountry.code);
      setFormatted(formatter.input(newDigits));
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setDigits("");
    setFormatted("");
  };

  const handleSubmit = async () => {
    if (isDisabled) return;
    setErrors("");
    setIsSubmitting(true);

    try {
      const fullPhone = selectedCountry.dialCode + digits;
      const response = await signupStart(fullPhone);
      const { id, email } = response.data;

      sessionStorage.setItem("signupAttemptID", id);
      sessionStorage.setItem("userEmail", email);
      router.push("/auth/signup/verify");
    } catch (error: any) {
      setErrors(error.message || "Failed to search for Cave profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`max-w-md mx-auto bg-white flex flex-col justify-between w-full min-h-screen relative pb-10 ${inter.className}`}
      onClick={() => {
        setFocus(false);
        setToggleKeyboard(false);
      }}
    >
      <div className="flex-1 pt-6 px-6 flex flex-col">
        <div className="mt-2">
          <ProgressBar currentStep={1} />
        </div>

        {/* Back and Help Header */}
        <div className="flex justify-between items-center mt-5">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-start text-neutral-800 hover:text-black cursor-pointer transition-colors"
          >
            {/* Left Chevron SVG */}
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
            className="text-[14px] text-neutral-800 font-medium hover:underline cursor-pointer transition-all"
          >
            Help
          </button>
        </div>

        {/* Title Block */}
        <div className="mt-6">
          <h1
            className={`text-[24px] ${dm_sans.className} font-bold text-neutral-900 tracking-tight leading-tight`}
          >
            Enter your Phone number
          </h1>
          <p
            className={`text-[15px] text-neutral-500 mt-2 font-normal ${dm_sans.className}`}
          >
            We&apos;ll use this to find your Cave profile
          </p>
        </div>

        {/* Form Inputs */}
        <div className={`flex gap-3 mt-8 ${space_mono.className}`}>
          {/* Country Selector */}
          <div
            className="flex items-center gap-2 border border-neutral-200 rounded-[10px] px-3 h-[48px] bg-white select-none cursor-pointer hover:bg-neutral-50 transition-colors"
            onClick={() => setShowCountrySelector(true)}
          >
            <SquareFlag
              flag={
                allCountryFlags[
                  selectedCountry.code.toLowerCase() as CountryCode
                ]
              }
              height={24}
              width={24}
            />
            <span className="text-[15px] font-semibold text-neutral-800">
              {selectedCountry.dialCode}
            </span>
            {/* Chevron Down */}
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              className="ml-0.5"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Mobile No Input Box */}
          <div
            className={`flex-1 border rounded-[10px] px-4 h-[48px] bg-white flex items-center transition-all ${
              focus
                ? "border-amber-500"
                : errors
                  ? "border-red-500"
                  : "border-neutral-200"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setFocus(true);
              setToggleKeyboard(true);
            }}
          >
            <span
              className={`text-[15px] font-medium tracking-wide ${
                digits.length > 0 ? "text-neutral-900" : "text-neutral-300"
              }`}
            >
              {focus || formatted.length > 0 ? formatted : "8123456789"}
            </span>
            {/* Blinking fake cursor */}
            {focus && (
              <span
                className="w-[1.5px] h-[18px] bg-neutral-900 ml-0.5"
                style={{ animation: "blink 1s step-end infinite" }}
              />
            )}
          </div>
        </div>
        <div className="h-6 mt-2 flex items-center">
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

        {/* Terms and Privacy Checkbox */}
        <div className="grid grid-cols-[1fr_7fr] gap-1 mt-6 select-none">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setAgreed(!agreed);
            }}
            className={`w-5 h-5 flex items-center justify-center border rounded-[4px] mt-0.5 cursor-pointer transition-colors ${
              agreed
                ? "bg-neutral-950 border-neutral-950 text-white"
                : "border-neutral-300 hover:border-neutral-400 bg-white"
            }`}
          >
            {agreed && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="10 3 4.5 8.5 2 6" />
              </svg>
            )}
          </div>
          <span
            className={`text-[12px] text-neutral-500 leading-snug font-normal cursor-pointer ${dm_sans.className}`}
            onClick={(e) => {
              e.stopPropagation();
              setAgreed(!agreed);
            }}
          >
            I have read, understood and agreed to the Terms & conditions and
            Privacy Policy.
          </span>
        </div>

        {/* Error Message Box */}

        {/* Continue Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSubmit();
          }}
          disabled={isDisabled}
          className={`w-full h-[54px] ${dm_sans.className} ${
            !isDisabled
              ? "bg-[#0E1B1B] text-white hover:bg-black cursor-pointer"
              : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
          } rounded-[10px] font-semibold text-[15px] flex items-center justify-center mt-6 select-none transition-colors`}
        >
          {isSubmitting ? "Searching..." : "Continue"}
        </button>

        {/* Create Cave Profile Link */}
        <div
          className={`mt-6 text-center text-[13px] ${dm_sans.className} text-neutral-500 font-normal`}
        >
          Don&apos;t have a Cave profile yet?{" "}
          <span className="text-neutral-900 font-semibold cursor-pointer hover:underline">
            Create one
          </span>
        </div>

        {/* Divider with 'or' */}
        <div className="flex items-center my-5 w-full">
          <div className="flex-1 h-[0.5px] bg-neutral-200" />
          <span
            className={`px-3 text-[13px] text-neutral-400 ${dm_sans.className}`}
          >
            or
          </span>
          <div className="flex-1 h-[0.5px] bg-neutral-200" />
        </div>

        {/* Log In Link */}
        <div
          className={`text-center text-[13px] ${dm_sans.className} text-neutral-500 font-normal mb-[240px]`}
        >
          Already have a CaveBank account?{" "}
          <span
            onClick={(e) => {
              e.stopPropagation();
              router.push("/auth/start");
            }}
            className="text-neutral-900 font-semibold cursor-pointer hover:underline"
          >
            Log in
          </span>
        </div>
      </div>

      {/* On-screen Custom iOS-style Numeric Keyboard */}
      {toggleKeyboard && <Keyboard onKey={handleKey} onDelete={handleDelete} />}

      {/* Country Selector Modal Component */}
      {showCountrySelector && (
        <CountrySelector
          selectedCountry={selectedCountry}
          onSelect={handleCountrySelect}
          onClose={() => setShowCountrySelector(false)}
        />
      )}
    </div>
  );
}
