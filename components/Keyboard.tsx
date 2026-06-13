"use client";

import { Space_Mono } from "next/font/google";

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Keyboard = ({
  digits = "",
  onKey,
  onDelete,
  setError = () => {},
}: {
  digits?: string;
  onKey: (digit: string) => void;
  onDelete: () => void;
  setError?: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 w-full ${space_mono.className} bg-[#D1D5DB]/70 backdrop-blur-xl font-semibold pb-[calc(env(safe-area-inset-bottom)+24px)] select-none`}
    >
      <div className="px-2 pt-2">
        <div className="grid grid-cols-3 gap-2">
          {/* 1 */}
          <div
            className="h-[52px] bg-white rounded-[6px] shadow-[0_1px_0_rgba(0,0,0,0.25)] flex items-center justify-center cursor-pointer active:bg-neutral-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onKey("1");
            }}
          >
            <span className="text-[26px]">1</span>
          </div>

          {/* 2 */}
          <div
            className="h-[52px] bg-white rounded-[6px] shadow-[0_1px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer active:bg-neutral-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onKey("2");
            }}
          >
            <span className="text-[24px] leading-none">2</span>
            <span className="text-[10px] text-neutral-500 tracking-widest">
              ABC
            </span>
          </div>

          {/* 3 */}
          <div
            className="h-[52px] bg-white rounded-[6px] shadow-[0_1px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer active:bg-neutral-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onKey("3");
            }}
          >
            <span className="text-[24px] leading-none">3</span>
            <span className="text-[10px] text-neutral-500 tracking-widest">
              DEF
            </span>
          </div>

          {/* 4 */}
          <div
            className="h-[52px] bg-white rounded-[6px] shadow-[0_1px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer active:bg-neutral-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onKey("4");
            }}
          >
            <span className="text-[24px] leading-none">4</span>
            <span className="text-[10px] text-neutral-500 tracking-widest">
              GHI
            </span>
          </div>

          {/* 5 */}
          <div
            className="h-[52px] bg-white rounded-[6px] shadow-[0_1px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer active:bg-neutral-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onKey("5");
            }}
          >
            <span className="text-[24px] leading-none">5</span>
            <span className="text-[10px] text-neutral-500 tracking-widest">
              JKL
            </span>
          </div>

          {/* 6 */}
          <div
            className="h-[52px] bg-white rounded-[6px] shadow-[0_1px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer active:bg-neutral-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onKey("6");
            }}
          >
            <span className="text-[24px] leading-none">6</span>
            <span className="text-[10px] text-neutral-500 tracking-widest">
              MNO
            </span>
          </div>

          {/* 7 */}
          <div
            className="h-[52px] bg-white rounded-[6px] shadow-[0_1px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer active:bg-neutral-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onKey("7");
            }}
          >
            <span className="text-[24px] leading-none">7</span>
            <span className="text-[10px] text-neutral-500 tracking-widest">
              PQRS
            </span>
          </div>

          {/* 8 */}
          <div
            className="h-[52px] bg-white rounded-[6px] shadow-[0_1px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer active:bg-neutral-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onKey("8");
            }}
          >
            <span className="text-[24px] leading-none">8</span>
            <span className="text-[10px] text-neutral-500 tracking-widest">
              TUV
            </span>
          </div>

          {/* 9 */}
          <div
            className="h-[52px] bg-white rounded-[6px] shadow-[0_1px_0_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer active:bg-neutral-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onKey("9");
            }}
          >
            <span className="text-[24px] leading-none">9</span>
            <span className="text-[10px] text-neutral-500 tracking-widest">
              WXYZ
            </span>
          </div>

          {/* 0 */}
          <div
            className="h-[52px] bg-white rounded-[6px] shadow-[0_1px_0_rgba(0,0,0,0.25)] flex flex-col col-span-2 items-center justify-center cursor-pointer active:bg-neutral-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onKey("0");
            }}
          >
            <span className="text-[24px] leading-none">0</span>
          </div>

          {/* delete */}
          <div
            className="h-[52px] rounded-[5px] flex items-center justify-center text-black cursor-pointer active:bg-neutral-300/40 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              if (digits.length === 0) setError("Enter Amount");
              else if (Number(digits) < 1)
                setError("Amount must be at least 1");
              onDelete();
            }}
          >
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[22px] h-[16px]"
            >
              <path d="M9 14L2 8L9 2H20V14H9Z" />
              <path d="M12 5L17 10M17 5L12 10" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
