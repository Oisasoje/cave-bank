"use client";

import Image from "next/image";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export default function Loading() {
  return (
    <div
      className={`max-w-md mx-auto bg-[#071111] flex flex-col z-99 fixed items-center justify-center w-full min-h-screen overflow-hidden select-none`}
      style={{
        backgroundImage: `
          radial-gradient(circle at center, rgba(234, 179, 8, 0.09) 0%, transparent 65%),
          linear-gradient(to right, rgba(234, 179, 8, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(234, 179, 8, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 64px 64px, 64px 64px",
        backgroundPosition: "center, center, center",
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading Cave Bank"
    >
      {/* Custom Animations Style Tag */}
      <style jsx global>{`
        @keyframes logoPulse {
          0%,
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 15px rgba(234, 179, 8, 0.25));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 35px rgba(234, 179, 8, 0.5));
          }
        }
        .animate-logo-pulse {
          animation: logoPulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* Floating background coin symbols with parallax / random placements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left small coin */}
        <div className="absolute top-[12%] left-[12%] w-10 h-10 opacity-[0.06] animate-float-slow">
          <Image
            src="/cave-coin-symbol-yellow.png"
            alt="Faded Cave Coin Background"
            fill
            sizes="40px"
            priority
          />
        </div>

        {/* Top-right medium coin */}
        <div className="absolute top-[24%] right-[16%] border-2 rounded-full border-amber-400 w-14 h-14 opacity-[0.08] animate-float-medium">
          <Image
            src="/cave-coin-symbol-yellow.png"
            alt="Faded Cave Coin Background"
            fill
            sizes="56px"
            priority
          />
        </div>

        {/* Bottom-right small coin */}
        <div className="absolute bottom-[28%] right-[22%] w-12 h-12 opacity-[0.07] animate-float-fast">
          <Image
            src="/cave-coin-symbol-yellow.png"
            alt="Faded Cave Coin Background"
            fill
            sizes="48px"
            priority
          />
        </div>

        {/* Bottom-left tiny coin */}
        <div className="absolute bottom-[16%] left-[8%] w-8 h-8 opacity-[0.05] animate-float-slow-reverse">
          <Image
            src="/cave-coin-symbol-yellow.png"
            alt="Faded Cave Coin Background"
            fill
            sizes="32px"
            priority
          />
        </div>
      </div>

      {/* Central Brand Identity Section */}
      <div className="flex flex-col items-center justify-center z-10 px-4">
        {/* Pulsing Central Yellow Logo */}
        <div className="w-[108px] h-[108px] relative animate-logo-pulse mb-6">
          <Image
            src="/cave-coin-symbol-yellow.png"
            alt="The Cave Bank Logo"
            fill
            sizes="108px"
            priority
            className="object-contain"
          />
        </div>

        {/* Typography Match */}
        <h1
          className={`${dmSans.className} text-[23px] font-extrabold tracking-tight text-[#EAB308] select-none text-center`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
        >
          The Cave Bank
        </h1>
      </div>

      {/* iOS style home indicator bar placeholder for mobile look */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/20 rounded-full pointer-events-none" />
    </div>
  );
}
