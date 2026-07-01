import { DM_Sans } from "next/font/google";

import { getInitials, getColorClass } from "@/lib/avatar";
import { Shimmer } from "./TransactionsSkeleton";
import selectedRecipientStore from "@/store/selectedRecipientStore";
import { useRouter } from "next/navigation";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const QuickSend = ({
  contacts,
  onAddClick,
  isLoading,
}: {
  contacts: any[];
  onAddClick?: () => void;
  isLoading: boolean;
}) => {
  const setSelectedRecipient = selectedRecipientStore(
    (state) => state.setSelectedRecipient,
  );
  const router = useRouter();

  const handleQuickSend = ({
    id,
    name,
    walletAddress,
  }: {
    id: string;
    name: string;
    walletAddress: string;
  }) => {
    setSelectedRecipient({
      accountId: id,
      name,
      walletAddress,
    });
    router.push("/wallet/send");
  };

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
            onClick={() => onAddClick?.()}
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
        {isLoading &&
          [1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 shrink-0 animate-pulse"
            >
              <div className="w-[58px] h-[58px] rounded-full bg-neutral-200" />
              <div className="w-[44px] h-[10px] rounded bg-neutral-200" />
            </div>
          ))}
        {contacts?.map((contact) => {
          const id = contact.id;
          const fullName = contact.name;
          const firstName = fullName.split(" ")[0];
          const initials = contact.initials || getInitials(fullName);
          const colorClass =
            contact.color || getColorClass(String(id || fullName));

          return (
            <div
              key={id}
              className="flex flex-col items-center min-w-0 shrink-0 snap-start group cursor-pointer"
              onClick={() => {
                handleQuickSend({
                  id: contact.accountId,
                  name: fullName,
                  walletAddress: contact.walletAddress,
                });
              }}
            >
              <div
                className={`w-[58px] h-[58px] rounded-full border flex items-center justify-center font-bold text-[15px] shadow-sm select-none transition-all group-hover:scale-105 active:scale-95 ${colorClass}`}
              >
                {initials}
              </div>
              <span className="text-[12px] text-neutral-600 truncate w-[58px] text-center font-semibold mt-2 group-hover:text-neutral-900 transition-colors">
                {firstName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickSend;
