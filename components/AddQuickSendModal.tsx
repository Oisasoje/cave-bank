"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { DM_Sans, Space_Mono } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import { getRecentCounterparties } from "@/services/user";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface InteractedContact {
  id: string;
  name: string;
  walletAddress: string;
  interactionType: "sent" | "received";
}

// Color palette that rotates through contacts
const avatarColors = [
  "bg-rose-100 text-rose-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-violet-100 text-violet-700",
  "bg-cyan-100 text-cyan-700",
  "bg-pink-100 text-pink-700",
  "bg-lime-100 text-lime-700",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const AddQuickSendModal = ({
  isOpen,
  onClose,
  onAddContacts,
  existingContactNames,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddContacts: (contacts: InteractedContact[]) => void;
  existingContactNames: string[];
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isClosing, setIsClosing] = useState(false);

  // Extract unique interacted contacts from transactions
  const { data: uniqueRecentRecipients, isLoading: favoritesLoading } =
    useQuery({
      queryKey: ["recent-counterparties"],
      queryFn: getRecentCounterparties,
      staleTime: Infinity,
    });

  console.log(uniqueRecentRecipients);

  // Toggle selection
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Handle close with animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);

      setSelectedIds(new Set());
      onClose();
    }, 250);
  };

  if (!isOpen) return null;

  const selectedCount = selectedIds.size;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-250 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        style={{
          animation: isClosing
            ? undefined
            : "fadeIn cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      />

      {/* Bottom Sheet */}
      <div
        className={`relative w-full max-w-md bg-neutral-50 rounded-t-[28px] shadow-2xl flex flex-col overflow-hidden ${
          isClosing ? "animate-slide-down" : "animate-slide-up"
        }`}
        style={{ maxHeight: "85dvh" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-[4px] rounded-full bg-neutral-300" />
        </div>

        {/* Header */}
        <div className="px-6 pt-3 pb-4">
          <div className="flex items-center justify-between">
            <h2
              className={`text-[18px] font-bold text-neutral-900 tracking-tight ${dm_sans.className}`}
            >
              Add Quick Send
            </h2>
            <button
              onClick={handleClose}
              className="w-[34px] h-[34px] rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <p className="text-[12px] text-neutral-400 font-semibold mt-1">
            Select people you&apos;ve recently interacted with
          </p>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-6 pb-4">
          {favoritesLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 py-2.5 animate-pulse"
                >
                  <div className="w-[46px] h-[46px] rounded-full bg-neutral-200 shrink-0" />
                  <div className="flex-1">
                    <div className="h-[13px] w-[120px] rounded bg-neutral-200 mb-2" />
                    <div className="h-[11px] w-[80px] rounded bg-neutral-100" />
                  </div>
                  <div className="w-[24px] h-[24px] rounded-full bg-neutral-200" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {uniqueRecentRecipients?.data?.map(
                (contact: any, index: number) => {
                  const isSelected = selectedIds.has(contact.accountId);
                  const colorClass = avatarColors[index % avatarColors.length];
                  return (
                    <button
                      key={contact.accountId}
                      type="button"
                      onClick={() => toggleSelect(contact.accountId)}
                      className={`w-full flex items-center gap-3.5 py-2.5 px-3 rounded-[16px] transition-all duration-150 cursor-pointer group active:scale-[0.98] ${
                        isSelected
                          ? "bg-[#D0BD21]/10 border border-[#D0BD21]/30"
                          : "bg-transparent border border-transparent hover:bg-neutral-100/60"
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-[46px] h-[46px] rounded-full flex items-center justify-center font-bold text-[14px] shrink-0 select-none transition-transform group-hover:scale-105 ${colorClass}`}
                      >
                        {getInitials(contact.displayName)}
                      </div>

                      {/* Name & interaction badge */}
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-[14px] font-bold text-neutral-800 leading-tight truncate">
                          {contact.displayName}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          {contact.direction === "sent" ? (
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#6B7280"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="7" y1="17" x2="17" y2="7" />
                              <polyline points="7 7 17 7 17 17" />
                            </svg>
                          ) : (
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#6B7280"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="17" y1="7" x2="7" y2="17" />
                              <polyline points="17 17 7 17 7 7" />
                            </svg>
                          )}
                          <span className="text-[11px] text-neutral-400 font-semibold">
                            {contact.direction === "sent" ? `Sent` : `Received`}
                          </span>
                        </div>
                      </div>

                      {/* Selection indicator */}
                      <div
                        className={`w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isSelected
                            ? "bg-[#0E1719] border-[#0E1719]"
                            : "border-neutral-300 bg-white group-hover:border-neutral-400"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                },
              )}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="px-6 pt-3 pb-6 border-t border-neutral-200/60 bg-neutral-50">
          <button
            type="button"
            disabled={selectedCount === 0}
            // onClick={handleAdd}
            className={`w-full h-[54px] rounded-[14px] font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 ${
              selectedCount > 0
                ? "bg-[#0E1719] text-white hover:bg-[#18262a] cursor-pointer shadow-md active:scale-[0.98]"
                : "bg-[#EAEAEA] text-neutral-400 cursor-not-allowed"
            }`}
          >
            {selectedCount === 0
              ? "Select Contacts"
              : selectedCount === 1
                ? "Add Contact"
                : `Add ${selectedCount} Contacts`}
            {selectedCount > 0 && (
              <span className="w-[22px] h-[22px] rounded-full bg-white/20 flex items-center justify-center text-[11px] font-bold">
                {selectedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuickSendModal;
