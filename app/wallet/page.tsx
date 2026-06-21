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
import {
  addFavorites,
  getBalance,
  getFavorites,
  getRecentTransactions,
} from "@/services/user";
import { queryClient } from "@/lib/queryClient";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Contact {
  id: string;
  name: string;
  initials: string;
  color: string;
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

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(walletAddress!);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  const { data: favorites, isLoading: favoritesLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    staleTime: Infinity,
  });

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
        <QuickSend
          contacts={favorites?.data}
          onAddClick={() => setIsAddModalOpen(true)}
          isLoading={favoritesLoading}
        />

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
        favorites={favorites?.data}
      />
    </div>
  );
}
