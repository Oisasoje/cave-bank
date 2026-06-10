import { DM_Sans, Space_Mono } from "next/font/google";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import useDebounce from "@/lib/hooks/useDebounce";
import { getUserByWalletAddress } from "@/services/transfer";
import { Beneficiary } from "@/app/wallet/send/page";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const beneficiaries: Beneficiary[] = [
  {
    accountId: "b1",
    name: "Catherine Onyeulo",
    walletAddress: "TCB-NG8123456789",
    isSaved: true,
  },
  {
    accountId: "b2",
    name: "Ohikemota Victor",
    walletAddress: "TCB-NG8123456789",
    isSaved: true,
  },
  {
    accountId: "b3",
    name: "Ayomide Olatunji",
    walletAddress: "TCB-NG81987654321",
    isSaved: true,
  },
  {
    accountId: "b4",
    name: "Nuel Samuel",
    walletAddress: "TCB-NG81564738290",
    isSaved: true,
  },
];

const RecipientSelection = ({
  selectedRecipientName,
  setSelectedRecipientName,
  setStep,
  step,
}: {
  selectedRecipientName: string | null;
  setSelectedRecipientName: (recipient: string | null) => void;
  step: number;
  setStep: (step: number) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"recents" | "saved">("recents");
  const [recipientInput, setRecipientInput] = useState<string>("");

  const debouncedWalletAddress = useDebounce(recipientInput, 800);

  useEffect(() => {
    if (
      !debouncedWalletAddress.trim() ||
      debouncedWalletAddress.trim().length < 10
    ) {
      setSelectedRecipientName(null);
      return;
    }
    const fetchRecipient = async () => {
      try {
        const { user } = await getUserByWalletAddress(debouncedWalletAddress);

        setSelectedRecipientName(user.data.name);
      } catch (error: any) {
        setSelectedRecipientName(null);
      }
    };
    fetchRecipient();
  }, [debouncedWalletAddress]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 350);
    return () => clearTimeout(timer);
  }, []);
  const isDisabled =
    !recipientInput.trim() ||
    selectedRecipientName === null ||
    selectedRecipientName === undefined ||
    selectedRecipientName.trim() === "";

  return (
    <div className="animate-fade-in">
      <form onSubmit={() => {}} className="flex flex-col px-6 mt-6">
        <div className="flex flex-col">
          <label className="text-[13px] font-bold text-neutral-500 block mb-2">
            Recipient Details
          </label>
          <div className="relative flex items-center">
            <input
              style={{ zIndex: 9999 }}
              type="text"
              ref={inputRef}
              placeholder="Enter Cave Bank Wallet Address"
              value={recipientInput}
              onChange={(e) => {
                setRecipientInput(e.target.value);
                setSelectedRecipientName(null);
              }}
              className={`w-full ${space_mono.className} h-[56px] border border-neutral-200 rounded-[14px] px-4 text-[14px] focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white placeholder-neutral-400 font-medium transition-all shadow-xs`}
            />
          </div>
        </div>

        <div className="h-40 flex flex-col gap-3">
          <div
            className={`grainy ${dm_sans.className} flex items-center bg-[#D0BD21]/50 rounded-[14px] border-2 border-neutral-400 font-semibold text-lg transition-all duration-300 ease-out origin-top ${
              selectedRecipientName
                ? "h-14 opacity-100 p-4 mt-6 scale-y-100"
                : "h-0 opacity-0 p-0 border-none mt-0 scale-y-95 pointer-events-none overflow-hidden"
            }`}
          >
            {selectedRecipientName}
          </div>
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full h-20 rounded-[14px] font-bold text-lg flex items-center justify-center transition-all duration-200 ${
              isDisabled
                ? "bg-[#EAEAEA] text-neutral-450 cursor-not-allowed"
                : "bg-[#0E1719] text-white hover:bg-[#18262a] cursor-pointer shadow-md"
            }`}
          >
            Continue
          </button>
        </div>
      </form>

      <div className="px-6 mt-8">
        <h3
          className={`text-[15px] font-bold text-neutral-800 mb-3 ${dm_sans.className}`}
        >
          Beneficiaries
        </h3>

        <div className="bg-white border border-neutral-200/60 rounded-[20px] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-neutral-100 px-4">
            <div className="flex gap-5">
              <button
                type="button"
                onClick={() => setActiveTab("recents")}
                className={`relative py-3.5 text-[14px] font-bold transition-colors cursor-pointer ${
                  activeTab === "recents"
                    ? "text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                Recents
                {activeTab === "recents" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D2B627] rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={`relative py-3.5 text-[14px] font-bold transition-colors cursor-pointer ${
                  activeTab === "saved"
                    ? "text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                Saved
                {activeTab === "saved" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D2B627] rounded-full" />
                )}
              </button>
            </div>

            <button
              type="button"
              className="text-[12px] font-bold text-neutral-800 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              See all
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="divide-y divide-neutral-100 p-4 space-y-3.5 divide-none">
            {filteredBeneficiaries.length > 0 ? (
              filteredBeneficiaries.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {}}
                  className="flex items-center gap-3.5 py-1 hover:bg-neutral-50/50 rounded-xl transition-colors cursor-pointer group active:scale-[0.99] duration-100"
                >
                  {b.avatarUrl ? (
                    <img
                      src={b.avatarUrl}
                      alt={b.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0 border border-neutral-200/50 shadow-xs"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 shrink-0 border border-neutral-250/30">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-neutral-400 group-hover:text-neutral-500 transition-colors"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}

                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-neutral-800 leading-tight group-hover:text-black transition-colors">
                      {b.name}
                    </p>
                    <p
                      className={`text-[11px] text-neutral-400 font-semibold mt-1 ${space_mono.className}`}
                    >
                      {b.address}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xs text-neutral-400 py-4 font-semibold">
                No beneficiaries found
              </p>
            )}
          </div>
        </div>

        <div
          onClick={() => {}}
          className="mt-6 grainy bg-[#EBEBEB] border border-neutral-300/60 rounded-[16px] p-4 flex items-center justify-between hover:bg-[#e2e2e2] active:scale-[0.99] transition-all cursor-pointer shadow-xs"
        >
          <div>
            <p className="text-[13px] font-bold text-neutral-800">
              See who else is using the Cave Bank
            </p>
            <p className="text-[11px] text-neutral-500 font-semibold mt-1">
              Find your contacts on the Cave Bank
            </p>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-800"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RecipientSelection;
