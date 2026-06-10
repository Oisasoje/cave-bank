"use client";

import { useRouter } from "next/navigation";
import { Inter, DM_Sans } from "next/font/google";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  const router = useRouter();

  return (
    <div
      className={`max-w-md mx-auto bg-[#FCFBF7] flex flex-col justify-between w-full min-h-screen relative px-6 py-12 ${inter.className} select-none overflow-hidden`}
    >
      {/* FLOATING COIN LOGO ILLUSTRATIONS */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Top-Left Coin - small, slow float */}
        <div className="absolute top-[14%] left-[14%] animate-float-slow opacity-70">
          <Image
            src="/cave-coin-symbol-yellow.png"
            alt="Cave Coin"
            width={28}
            height={28}
            className="object-contain drop-shadow-sm"
          />
        </div>

        {/* Top-Right Coin - medium, offset */}
        <div className="absolute top-[20%] right-[18%] animate-float-medium opacity-60">
          <Image
            src="/cave-coin-symbol-yellow.png"
            alt="Cave Coin"
            width={22}
            height={22}
            className="object-contain drop-shadow-sm"
          />
        </div>

        {/* Mid-Left Coin */}
        <div className="absolute top-[48%] left-[8%] animate-float-fast opacity-65">
          <Image
            src="/cave-coin-symbol-yellow.png"
            alt="Cave Coin"
            width={26}
            height={26}
            className="object-contain drop-shadow-sm"
          />
        </div>

        {/* Mid-Right Coin */}
        <div className="absolute top-[44%] right-[10%] animate-float-slow-reverse opacity-70">
          <Image
            src="/cave-coin-symbol-yellow.png"
            alt="Cave Coin"
            width={32}
            height={32}
            className="object-contain drop-shadow-sm"
          />
        </div>

        {/* Bottom-Left Coin */}
        <div className="absolute bottom-[38%] left-[20%] animate-float-medium opacity-55">
          <Image
            src="/cave-coin-symbol-yellow.png"
            alt="Cave Coin"
            width={20}
            height={20}
            className="object-contain drop-shadow-sm"
          />
        </div>
      </div>

      {/* TOP SPACER */}
      <div className="flex-1" />

      {/* CORE WELCOME CONTENT */}
      <div className="flex flex-col items-center justify-center text-center px-2 relative z-20">
        {/* Main Hero Logo */}
        <div className="mb-10">
          <Image
            src="/cave-logo-black.png"
            alt="Cave Bank Logo"
            width={120}
            height={120}
            className="object-contain drop-shadow-md"
            priority
          />
        </div>

        {/* Main Header */}
        <h1
          className={`text-[28px] font-bold text-neutral-900 tracking-tight leading-tight  ${dm_sans.className}`}
        >
          Simple. Secure.
          <br />
          Built For The Cave.
        </h1>

        {/* Subtitle */}
        <p className="text-[14px] text-neutral-500 font-medium leading-relaxed mt-5 max-w-[300px]">
          Manage your Cave Coins with ease. Transfer funds, receive rewards, and
          stay connected to the ecosystem from one secure wallet.
        </p>
      </div>

      {/* BOTTOM SPACER */}
      <div className="flex-1" />

      {/* CTA BUTTONS */}
      <div className="space-y-3.5 relative z-20 w-full">
        {/* Get Started Button */}
        <button
          onClick={() => router.push("/auth/signup/start")}
          className={`w-full h-[54px] bg-[#0E1719] text-white hover:bg-[#18262a] active:scale-[0.98] rounded-[14px] font-bold text-[15px] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md ${dm_sans.className}`}
        >
          Get Started
        </button>

        {/* Login Button */}
        <button
          onClick={() => router.push("/auth/login/start")}
          className={`w-full h-[54px] bg-white border border-neutral-300 text-neutral-800 hover:bg-[#FAF9F5] active:scale-[0.98] rounded-[14px] font-bold text-[15px] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${dm_sans.className}`}
        >
          Login
        </button>
      </div>
    </div>
  );
}
