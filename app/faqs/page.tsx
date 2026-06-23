"use client";

import { useState } from "react";
import { Inter, DM_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "q1",
    question: "What is a Cave account?",
    answer:
      "A Cave Account is your identity within The Cave. It contains your basic details and connects you to the ecosystem.",
  },
  {
    id: "q2",
    question: "What's the difference between a Cave Account and Cave Bank?",
    answer:
      "A Cave Account manages your identity within The Cave, while Cave Bank manages your Cave Coins and financial activity.",
  },
  {
    id: "q3",
    question: "How do I recover my account if I forget my PIN?",
    answer:
      "If you forget your PIN, tap on 'Forgot PIN' on the login screen. You will be guided through a verification process to reset it securely. If you're already authenticated, you can reset your PIN from the profile page.",
  },
  {
    id: "q4",
    question: "I don't have a Cave Account yet.",
    answer:
      "Setting up a Cave Account takes less than two minutes. Tap the 'Create One' button on the login screen, fill in your details, choose a security PIN, and verify your mobile number to get started.",
  },
  {
    id: "q5",
    question: "Not sure if I already opened an account?",
    answer:
      "Try to log in with your primary phone number. If an account is already associated, you will see a request for your PIN. You can choose 'Reset PIN' if you have lost access.",
  },
];

export default function FAQsPage() {
  const router = useRouter();

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div
      className={`max-w-md mx-auto bg-neutral-50 min-h-dvh flex flex-col w-full pb-12 select-none ${inter.className}`}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-neutral-50 px-6 pt-6 pb-3 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="cursor-pointer active:scale-90 transition-all text-neutral-800 p-1 -ml-1 flex items-center justify-center"
          aria-label="Go back"
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
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1
          className={`text-[17px] font-bold text-neutral-800 absolute left-1/2 -translate-x-1/2 ${dm_sans.className}`}
        >
          FAQs
        </h1>
        <div className="w-5" />
      </div>

      <div className="flex-1 flex flex-col px-6 mt-4">
        {/* ── Accordion List ────────────────────────────────────────── */}

        <div className="border border-neutral-200/60 bg-white rounded-[16px] overflow-hidden shadow-xs divide-y divide-neutral-100 mb-8">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = expandedId === faq.id;
            return (
              <div key={faq.id} className="transition-all duration-200">
                <button
                  type="button"
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full flex items-center justify-between py-4 px-4 hover:bg-neutral-50/50 transition-colors cursor-pointer text-left"
                >
                  <span className="text-[14px] font-semibold text-neutral-800 pr-4 leading-snug">
                    {faq.question}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className={`grid transition-all duration-250 ease-in-out overflow-hidden ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4.5 pt-1 text-[13px] text-neutral-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer / CTA Section ──────────────────────────────────── */}
        <div className="mt-auto pt-6 flex flex-col items-center gap-3">
          <span className="text-[13px] font-medium text-neutral-500">
            Can't find what you are looking for?
          </span>
          <Link
            href="https://wa.link/4u169w"
            target="_blank"
            className="h-[48px] bg-[#0E1719] hover:bg-[#18262a] active:scale-98 text-white rounded-[12px] font-bold text-[14px] px-8 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm mb-4"
          >
            Chat with Us
          </Link>
        </div>
      </div>
    </div>
  );
}
