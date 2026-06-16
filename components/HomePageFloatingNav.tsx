"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HomePageFloatingNav = () => {
  const pathname = usePathname();

  // Helper to determine if a route is active
  const isActive = (path: string) => pathname === path;

  // Show the navbar only on main dashboard pages
  const showNav =
    isActive("/wallet") ||
    isActive("/transactions") ||
    isActive("/account");

  if (!showNav) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#12161A] text-white rounded-[24px] p-2 flex items-center gap-1.5 shadow-xl w-[calc(100%-48px)] max-w-[380px]">
      {/* Home Tab */}
      <Link
        href="/wallet"
        className={`flex-1 flex flex-col items-center justify-center py-2 px-1.5 rounded-[18px] transition-all cursor-pointer ${
          isActive("/wallet")
            ? "bg-neutral-800 text-yellow-400 font-bold"
            : "text-neutral-400 font-semibold"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="mb-1"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="text-[10px]">Home</span>
      </Link>

      {/* Transactions Tab */}
      <Link
        href="/transactions"
        className={`flex-1 flex flex-col items-center justify-center py-2 px-1.5 rounded-[18px] transition-all cursor-pointer ${
          isActive("/transactions")
            ? "bg-neutral-800 text-yellow-400 font-bold"
            : "text-neutral-400 font-semibold"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="mb-1"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
        <span className="text-[10px]">Transactions</span>
      </Link>

      {/* Account Tab */}
      <Link
        href="/account"
        className={`flex-1 flex flex-col items-center justify-center py-2 px-1.5 rounded-[18px] transition-all cursor-pointer ${
          isActive("/account")
            ? "bg-neutral-800 text-yellow-400 font-bold"
            : "text-neutral-400 font-semibold"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="mb-1"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="text-[10px]">Account</span>
      </Link>
    </div>
  );
};

export default HomePageFloatingNav;
