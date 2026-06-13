"use client";
import ConfettiAnimation from "@/components/Confetti";
import ProgressBar from "@/components/ProgressBar";
import { Inter, DM_Sans } from "next/font/google";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function CongratulationsPage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [userName, setUserName] = useState("there");

  useEffect(() => {
    const user = sessionStorage.getItem("signupAttemptID");
    if (!user) {
      router.replace("/auth/signup/start");
      return;
    }
    // Try to get a display name
    const email = sessionStorage.getItem("userEmail") || "";
    if (email) {
      const name = email.split("@")[0];
      // Capitalize first letter
      setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    }
    setHydrated(true);
  }, [router]);

  // Countdown timer
  useEffect(() => {
    if (!hydrated) return;
    if (countdown <= 0) {
      router.push("/wallet");
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [hydrated, countdown, router]);

  if (!hydrated) return null;

  return (
    <div
      className={`max-w-md mx-auto bg-white flex flex-col w-full min-h-dvh relative ${inter.className} select-none`}
    >
      <div className="pt-6 px-6 mt-2">
        <ConfettiAnimation />
        <ProgressBar currentStep={4} />
      </div>

      {/* Main Content - centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Confetti area */}
        <div className="relative w-full h-[120px] mb-2">
          {/* Clapping hands GIF */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/clapping.gif"
              alt="Clapping hands"
              width={64}
              height={60}
              className="object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h1
          className={`text-[24px] ${dm_sans.className} font-bold text-neutral-900 tracking-tight text-center`}
        >
          Congratulations
        </h1>

        {/* Subtitle */}
        <p
          className={`text-[15px] text-neutral-500 mt-3 font-normal ${dm_sans.className} text-center leading-relaxed max-w-[260px]`}
        >
          You are all set. You will be redirected to your wallet in {countdown}s
        </p>
      </div>

      {/* Go to Wallet button */}
      <div className="px-6 pb-10">
        <button
          onClick={() => router.push("/wallet")}
          className={`w-full h-[54px] ${dm_sans.className} rounded-[10px] font-semibold text-[15px] flex items-center justify-center select-none transition-colors border border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 cursor-pointer`}
        >
          Go to Wallet
        </button>
      </div>

      {/* Confetti animation keyframes */}
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(40px) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes clap {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          30% {
            transform: scale(1.15) rotate(-8deg);
          }
          60% {
            transform: scale(1.15) rotate(8deg);
          }
        }
      `}</style>
    </div>
  );
}
