import { DM_Sans } from "next/font/google";
import React from "react";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const QuickSend = ({ contacts }: { contacts: any[] }) => {
  return (
    <div className="mt-7">
      <h3
        className={`text-[13px] text-neutral-400 font-bold uppercase tracking-wider mb-3.5 ${dm_sans.className}`}
      >
        Quick Send
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
        {/* Add contact button */}
        <div className="flex flex-col items-center shrink-0 snap-start">
          <button
            onClick={() => {}}
            className="w-[58px] h-[58px] rounded-full border-[1.5px] border-dashed border-neutral-300 flex items-center justify-center hover:border-neutral-500 transition-colors cursor-pointer bg-white active:scale-95 duration-150"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7280"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <span className="text-[12px] text-neutral-500 font-semibold mt-2">
            Add
          </span>
        </div>

        {/* Contacts Slider */}
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex flex-col items-center shrink-0 snap-start group cursor-pointer"
            onClick={() => {}}
          >
            <div
              className={`w-[58px] h-[58px] rounded-full border border-neutral-300/40 flex items-center justify-center font-bold text-[15px] shadow-sm select-none transition-all group-hover:scale-105 active:scale-95 ${contact.color}`}
            >
              {contact.initials}
            </div>
            <span className="text-[12px] text-neutral-600 font-semibold mt-2 group-hover:text-neutral-900 transition-colors">
              {contact.name.length > 9
                ? `${contact.name.slice(0, 8)}.`
                : contact.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickSend;
