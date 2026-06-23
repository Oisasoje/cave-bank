"use client";
import { loginStart } from "@/services/auth";
import Keyboard from "@/components/Keyboard";
import CountrySelector from "@/components/CountrySelector";
import type { Country } from "@/components/CountrySelector";
import { Inter, DM_Sans, Space_Mono } from "next/font/google";
import { useState } from "react";
import { AsYouType, isValidPhoneNumber } from "libphonenumber-js";
import { allCountryFlags, CountryCode, SquareFlag } from "react-square-flags";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "700"],
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "700"],
});

export default function LoginPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: "NG",
    name: "Nigeria",
    dialCode: "+234",
  });
  const [digits, setDigits] = useState("");
  const [focus, setFocus] = useState(true);
  const [formatted, setFormatted] = useState("");
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [errors, setErrors] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isValid =
    digits.length > 0 && isValidPhoneNumber(digits, selectedCountry.code);
  const isDisabled = !isValid || isSubmitting;

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
      const response = await loginStart(selectedCountry.dialCode + digits);
      const { id } = response.data;

      sessionStorage.setItem("loginAttemptID", id);

      router.push("/auth/login/verify");
    } catch (error: any) {
      setErrors(error.message);
      setFocus(true);
      setIsSubmitting(false);
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
            Welcome Back
          </h1>
          <p
            className={`text-[15px] text-neutral-500 mt-2 font-normal ${dm_sans.className}`}
          >
            Enter your Cave phone number to continue
          </p>
        </div>

        {/* Form Fields */}
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

          {/* Phone Input Box */}
          <div
            className={`flex-1 ${focus ? "border-amber-500" : errors ? "border-red-500" : "border-neutral-200"} border  rounded-[10px] px-4 h-[48px] bg-white flex items-center`}
            onClick={(e) => {
              e.stopPropagation();
              setFocus(true);
            }}
          >
            <span
              className={`text-[15px] font-medium tracking-wide ${
                digits.length > 0 ? "text-neutral-900" : "text-neutral-400"
              }`}
            >
              {focus || formatted.length > 0 ? formatted : "8123456789"}
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

        <div className={`h-5 ${inter.className} `}>
          {errors && (
            <span className="text-[12px] font-semibold text-red-500">
              {errors}
            </span>
          )}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`w-full h-[54px] ${dm_sans.className} ${
            !isDisabled
              ? "bg-[#0E1B1B] text-white"
              : "bg-neutral-200 text-neutral-400"
          } rounded-[10px] font-semibold text-[15px] flex items-center justify-center mt-8 select-none transition-colors cursor-pointer`}
        >
          Continue
        </button>

        {/* Signup Link */}
        <div
          className={`mt-5 text-center text-[13px] ${dm_sans.className} text-neutral-500 font-normal`}
        >
          Don&apos;t have a Cave Bank account?{" "}
          <span
            onClick={() => router.push("/auth/signup/start")}
            className="text-neutral-900 font-semibold cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </div>
      </div>

      {/* Keyboard */}
      {focus && <Keyboard onKey={handleKey} onDelete={handleDelete} />}

      {/* Country Selector Modal */}
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
