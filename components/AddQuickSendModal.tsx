"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { DM_Sans, Space_Mono } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import { getRecentTransactions } from "@/services/user";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isClosing, setIsClosing] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const { data: recentTransactions, isLoading } = useQuery({
    queryKey: ["transactions", { limit: 20 }],
    queryFn: () => getRecentTransactions(20),
    enabled: isOpen,
  });

  // Extract unique interacted contacts from transactions
  const interactedContacts: InteractedContact[] = useMemo(() => {
    if (!recentTransactions?.data) return [];

    const contactMap = new Map<string, InteractedContact>();

    recentTransactions.data.forEach((tx: any) => {
      if (tx.type === "debit" && tx.accounts_to?.users?.name) {
        const address = tx.accounts_to.address;
        if (!contactMap.has(address)) {
          contactMap.set(address, {
            id: address,
            name: tx.accounts_to.users.name,
            walletAddress: address,
            interactionType: "sent",
          });
        }
      } else if (tx.type === "credit" && tx.accounts_from?.users?.name) {
        const address = tx.accounts_from.address;
        if (!contactMap.has(address)) {
          contactMap.set(address, {
            id: address,
            name: tx.accounts_from.users.name,
            walletAddress: address,
            interactionType: "received",
          });
        }
      }
    });

    return Array.from(contactMap.values());
  }, [recentTransactions]);

  // Filter contacts based on search and exclude already-added contacts
  const filteredContacts = useMemo(() => {
    const lowerExisting = existingContactNames.map((n) => n.toLowerCase());
    return interactedContacts
      .filter((c) => !lowerExisting.includes(c.name.toLowerCase()))
      .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [interactedContacts, searchQuery, existingContactNames]);

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
      setSearchQuery("");
      setSelectedIds(new Set());
      onClose();
    }, 250);
  };

  // Handle add
  const handleAdd = () => {
    const selected = interactedContacts.filter((c) => selectedIds.has(c.id));
    onAddContacts(selected);
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setSearchQuery("");
      setSelectedIds(new Set());
      onClose();
    }, 250);
  };

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchRef.current?.focus();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
            : "fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
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
            Select people you&apos;ve interacted with
          </p>
        </div>

        {/* Search */}
        <div className="px-6 pb-4">
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[46px] border border-neutral-200 rounded-[14px] pl-10 pr-10 text-[13px] font-semibold focus:outline-none focus:ring-1 focus:ring-[#D2B627] bg-white placeholder-neutral-400 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full bg-neutral-200 flex items-center justify-center hover:bg-neutral-300 transition-colors cursor-pointer"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B7280"
                  strokeWidth="3"
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

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-6 pb-4">
          {isLoading ? (
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
          ) : filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <p
                className={`text-[13px] font-bold text-neutral-400 ${dm_sans.className}`}
              >
                {searchQuery
                  ? "No contacts match your search"
                  : "No new contacts to add"}
              </p>
              <p className="text-[11px] text-neutral-400 mt-1">
                {searchQuery
                  ? "Try a different name"
                  : "All your recent contacts are already added"}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredContacts.map((contact, index) => {
                const isSelected = selectedIds.has(contact.id);
                const colorClass = avatarColors[index % avatarColors.length];
                return (
                  <button
                    key={contact.id}
                    type="button"
                    onClick={() => toggleSelect(contact.id)}
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
                      {getInitials(contact.name)}
                    </div>

                    {/* Name & interaction badge */}
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-[14px] font-bold text-neutral-800 leading-tight truncate">
                        {contact.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        {contact.interactionType === "sent" ? (
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
                          {contact.interactionType === "sent"
                            ? "Sent to them"
                            : "Received from them"}
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
              })}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="px-6 pt-3 pb-6 border-t border-neutral-200/60 bg-neutral-50">
          <button
            type="button"
            disabled={selectedCount === 0}
            onClick={handleAdd}
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
