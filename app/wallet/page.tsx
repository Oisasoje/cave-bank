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
import WalletHomeHeader from "@/components/WalletHomeHeader";
import HomePageFloatingNav from "@/components/HomePageFloatingNav";
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
  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: getUser,
  });

  const { data: balance } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });
  const { data: recentTransactions, isLoading } = useQuery({
    queryKey: ["transactions", { limit: 10 }],
    queryFn: getRecentTransactions,
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
  const [showBalance, setShowBalance] = useState(false);

  // Copy ID Clipboard Alert State
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleCopyId = () => {
    navigator.clipboard.writeText(walletAddress!);
    setCopied(true);
    triggerToast("Account ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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
        <QuickSend contacts={contacts} />

        {/* RECENT TRANSACTIONS */}
        <RecentTransactions
          transactions={recentTransactionsData}
          isLoading={isLoading}
        />
      </div>

      {/* FLOATING BOTTOM NAVIGATION BAR */}
      <HomePageFloatingNav />
    </div>
  );
}
