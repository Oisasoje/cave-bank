"use client";

import { useState, useEffect } from "react";
import { Inter, DM_Sans, Space_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/auth";
import BalanceCard from "@/components/BalanceCard";
import WalletSkeleton from "@/components/WalletSkeleton";
import RecentTransactions from "@/components/RecentTransactions";
import QuickSend from "@/components/QuickSend";
import AddQuickSendModal from "@/components/AddQuickSendModal";
import WalletHomeHeader from "@/components/WalletHomeHeader";
import WalletPageQuickActions from "@/components/WalletPageQuickActions";
import { getBalance, getRecentTransactions } from "@/services/user";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Contact {
  id: string;
  name: string;
  initials: string;
  color: string;
}

interface Transaction {
  id: string;
  type: "send" | "receive";
  title: string;
  date: string;
  amount: number;
  status: "Pending" | "Successful" | "Failed";
}

export default function WalletPage() {
  const router = useRouter();
  const { data: me, isError: meError } = useQuery({
    queryKey: ["me"],
    queryFn: getUser,
  });

  const { data: balance } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });
  const { data: recentTransactions, isLoading } = useQuery({
    queryKey: ["transactions", { limit: 5 }],
    queryFn: () => getRecentTransactions(5),
  });

  const walletAddress = me?.data?.wallet_address ?? "";
  const firstName = me?.data?.user?.name?.split(" ")?.[0] ?? "";
  const formattedBalance = balance?.data?.balance ?? 0;

  const recentTransactionsData = recentTransactions?.data ?? [];

  // Authentication & Session Loading

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Balance Visibility State
  const [showBalance, setShowBalance] = useState(true);

  // Copy ID Clipboard Alert State
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(walletAddress!);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  // Contacts List State
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Catherine",
      initials: "CO",
      color: "bg-rose-100 text-rose-700 border-rose-200",
    },
    {
      id: "2",
      name: "Ayomide",
      initials: "AO",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    {
      id: "3",
      name: "Victor",
      initials: "VO",
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    {
      id: "4",
      name: "Nuel Sa",
      initials: "NS",
      color: "bg-amber-100 text-amber-700 border-amber-200",
    },
  ]);

  // Trigger toast helper
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Handle contacts added from modal
  const handleAddContacts = (newContacts: { id: string; name: string; walletAddress: string; interactionType: string }[]) => {
    const colorPool = [
      "bg-rose-100 text-rose-700 border-rose-200",
      "bg-blue-100 text-blue-700 border-blue-200",
      "bg-emerald-100 text-emerald-700 border-emerald-200",
      "bg-amber-100 text-amber-700 border-amber-200",
      "bg-violet-100 text-violet-700 border-violet-200",
      "bg-cyan-100 text-cyan-700 border-cyan-200",
      "bg-pink-100 text-pink-700 border-pink-200",
      "bg-lime-100 text-lime-700 border-lime-200",
    ];

    const mapped = newContacts.map((c, i) => {
      const parts = c.name.trim().split(/\s+/);
      const initials = parts.length >= 2
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : c.name.slice(0, 2).toUpperCase();
      return {
        id: c.id,
        name: c.name.split(" ")[0],
        initials,
        color: colorPool[(contacts.length + i) % colorPool.length],
      };
    });

    setContacts((prev) => [...prev, ...mapped]);
    triggerToast(`${mapped.length} contact${mapped.length > 1 ? "s" : ""} added`);
  };

  useEffect(() => {
    if (meError) {
      router.push("/auth/login/start");
    }
  }, [meError, router]);

  if (!hydrated || !me) {
    return <WalletSkeleton />;
  }

  return (
    <div
      className={`max-w-md mx-auto bg-neutral-50 flex flex-col w-full min-h-dvh relative ${inter.className} select-none pb-24 overflow-x-hidden`}
    >
      {/* Toast Alert popup */}
      {showToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white text-[13px] px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-neutral-800 transition-all animate-bounce">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#EAB308"
            strokeWidth="2.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <WalletHomeHeader firstName={firstName} />

      {/* MAIN HOME VIEW */}

      <div className="flex flex-col flex-1 px-6 mt-4">
        {/* BALANCE CARD */}
        <BalanceCard
          showBalance={showBalance}
          setShowBalance={setShowBalance}
          walletAddress={walletAddress!}
          handleCopyId={handleCopyId}
          copied={copied}
          formattedBalance={formattedBalance}
        />

        {/* QUICK ACTION BUTTONS */}
        <WalletPageQuickActions />

        {/* QUICK SEND SECTION */}
        <QuickSend contacts={contacts} onAddClick={() => setIsAddModalOpen(true)} />

        {/* RECENT TRANSACTIONS */}
        <RecentTransactions
          showBalance={showBalance}
          transactions={recentTransactionsData}
          isLoading={isLoading}
        />
      </div>

      {/* Quick Send Add Modal */}
      <AddQuickSendModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddContacts={handleAddContacts}
        existingContactNames={contacts.map((c) => c.name)}
      />
    </div>
  );
}
