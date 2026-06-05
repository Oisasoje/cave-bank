"use client";
import ProgressBar from "@/components/ProgressBar";
import { Inter, DM_Sans } from "next/font/google";
import Image from "next/image";
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

// Confetti piece component
function ConfettiPiece({
  color,
  left,
  top,
  size,
  rotation,
  delay,
  shape,
}: {
  color: string;
  left: string;
  top: string;
  size: number;
  rotation: number;
  delay: number;
  shape: "square" | "rect" | "circle";
}) {
  const style: React.CSSProperties = {
    position: "absolute",
    left,
    top,
    width: shape === "rect" ? size * 2.5 : size,
    height: shape === "circle" ? size : size,
    backgroundColor: color,
    borderRadius: shape === "circle" ? "50%" : shape === "rect" ? "2px" : "1px",
    transform: `rotate(${rotation}deg)`,
    animation: `confettiFall 3s ease-in-out ${delay}s infinite`,
    opacity: 0.9,
  };
  return <span style={style} />;
}

const confettiPieces = [
  {
    color: "#3B82F6",
    left: "10%",
    top: "2%",
    size: 6,
    rotation: 45,
    delay: 0,
    shape: "square" as const,
  },
  {
    color: "#F59E0B",
    left: "20%",
    top: "5%",
    size: 5,
    rotation: 120,
    delay: 0.2,
    shape: "rect" as const,
  },
  {
    color: "#EC4899",
    left: "75%",
    top: "1%",
    size: 7,
    rotation: 30,
    delay: 0.4,
    shape: "square" as const,
  },
  {
    color: "#10B981",
    left: "85%",
    top: "4%",
    size: 5,
    rotation: 90,
    delay: 0.1,
    shape: "circle" as const,
  },
  {
    color: "#8B5CF6",
    left: "30%",
    top: "0%",
    size: 4,
    rotation: 160,
    delay: 0.3,
    shape: "rect" as const,
  },
  {
    color: "#F59E0B",
    left: "65%",
    top: "3%",
    size: 6,
    rotation: 75,
    delay: 0.5,
    shape: "square" as const,
  },
  {
    color: "#EC4899",
    left: "45%",
    top: "1%",
    size: 5,
    rotation: 200,
    delay: 0.15,
    shape: "circle" as const,
  },
  {
    color: "#3B82F6",
    left: "55%",
    top: "6%",
    size: 4,
    rotation: 300,
    delay: 0.35,
    shape: "rect" as const,
  },
  {
    color: "#10B981",
    left: "15%",
    top: "7%",
    size: 5,
    rotation: 15,
    delay: 0.25,
    shape: "square" as const,
  },
  {
    color: "#8B5CF6",
    left: "90%",
    top: "2%",
    size: 6,
    rotation: 250,
    delay: 0.45,
    shape: "circle" as const,
  },
  {
    color: "#F59E0B",
    left: "5%",
    top: "8%",
    size: 4,
    rotation: 180,
    delay: 0.55,
    shape: "rect" as const,
  },
  {
    color: "#EC4899",
    left: "40%",
    top: "5%",
    size: 5,
    rotation: 60,
    delay: 0.6,
    shape: "square" as const,
  },
];

export default function Congratulations() {
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
      router.push("/dashboard");
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
      className={`max-w-md mx-auto bg-white flex flex-col w-full min-h-screen relative ${inter.className} select-none`}
    >
      <div className="pt-6 px-6 mt-2">
        <ProgressBar currentStep={4} />
      </div>

      {/* Main Content - centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Confetti area */}
        <div className="relative w-full h-[120px] mb-2">
          {confettiPieces.map((piece, i) => (
            <ConfettiPiece key={i} {...piece} />
          ))}
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
          onClick={() => router.push("/dashboard")}
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
