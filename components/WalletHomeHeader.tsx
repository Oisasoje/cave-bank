import { DM_Sans } from "next/font/google";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const WalletHomeHeader = ({ firstName }: { firstName: string }) => {
  return (
    <div className="pt-6 px-6 flex justify-between items-center bg-neutral-50 sticky top-0 z-30">
      <div>
        <h1
          className={`text-[16px] font-bold text-neutral-800 tracking-tight ${dm_sans.className}`}
        >
          Good morning, <span className="text-neutral-950">{firstName}</span>
        </h1>
      </div>
      <button
        onClick={() => {}}
        className="relative w-[42px] h-[42px] bg-white rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors shadow-sm cursor-pointer"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1F2937"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
      </button>
    </div>
  );
};

export default WalletHomeHeader;
