import { DM_Sans, Space_Mono } from "next/font/google";
import React, { Dispatch, SetStateAction } from "react";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const RecipientSelection = ({
  activeTab,
  setActiveTab,
  filteredBeneficiaries,
  handleBeneficiarySelect,
  triggerToast,
  setRecipientInput,
  recipientInput,
  handleContinue,

  setSelectedRecipient,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<"recents" | "saved">>;
  filteredBeneficiaries: any[];
  handleBeneficiarySelect: (beneficiary: any) => void;
  triggerToast: (message: string) => void;
  setRecipientInput: (input: string) => void;
  recipientInput: string;
  handleContinue: (e: React.FormEvent) => void;

  setSelectedRecipient: (recipient: any) => void;
}) => {
  return (
    <div className="animate-fade-in">
      <form onSubmit={handleContinue} className="flex flex-col px-6 mt-6">
        <div className="flex flex-col">
          <label className="text-[13px] font-bold text-neutral-500 block mb-2">
            Recipient Details
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Enter Cave Bank ID/phone number/name"
              value={recipientInput}
              onChange={(e) => setRecipientInput(e.target.value)}
              className="w-full h-[56px] border border-neutral-200 rounded-[14px] px-4 text-[14px] focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white placeholder-neutral-400 font-medium transition-all shadow-xs"
            />
            {recipientInput && (
              <button
                type="button"
                onClick={() => {
                  setRecipientInput("");
                  setSelectedRecipient(null);
                }}
                className="absolute right-4 text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!recipientInput.trim()}
          className={`w-full h-[54px] rounded-[14px] font-bold text-[14px] mt-6 flex items-center justify-center transition-all duration-200 ${
            recipientInput.trim()
              ? "bg-[#0E1719] text-white hover:bg-[#18262a] active:scale-[0.98] cursor-pointer shadow-md"
              : "bg-[#EAEAEA] text-neutral-450 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
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
              onClick={() => triggerToast("Viewing all beneficiaries")}
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
                  onClick={() => handleBeneficiarySelect(b)}
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
          onClick={() => triggerToast("Opening contact sync workflow...")}
          className="mt-6 bg-[#EBEBEB] border border-neutral-300/60 rounded-[16px] p-4 flex items-center justify-between hover:bg-[#e2e2e2] active:scale-[0.99] transition-all cursor-pointer shadow-xs"
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
