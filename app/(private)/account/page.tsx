"use client";

import { useState, useEffect } from "react";
import { Inter, DM_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUser, logout } from "@/services/auth";
import { getInitials, getColorClass } from "@/lib/avatar";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// ─── Toggle component ────────────────────────────────────────────────────────
function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={`relative inline-flex h-[28px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-[#D0BD21]" : "bg-neutral-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
          enabled ? "translate-x-[22px]" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <p
      className={`text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 mt-6 px-1 ${dm_sans.className}`}
    >
      {label}
    </p>
  );
}

// ─── Row: toggle ─────────────────────────────────────────────────────────────
function ToggleRow({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-3.5 px-4 bg-white first:rounded-t-[16px] last:rounded-b-[16px]">
      <span className="text-[14px] font-semibold text-neutral-800">
        {label}
      </span>
      <Toggle enabled={enabled} onToggle={onToggle} />
    </div>
  );
}

// ─── Row: chevron link ────────────────────────────────────────────────────────
function ChevronRow({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between py-3.5 px-4 bg-white first:rounded-t-[16px] last:rounded-b-[16px] hover:bg-neutral-50 transition-colors cursor-pointer active:scale-[0.99]"
    >
      <span className="text-[14px] font-semibold text-neutral-800">
        {label}
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}

// ─── Divider between rows inside a card ──────────────────────────────────────
function RowDivider() {
  return <div className="h-px bg-neutral-100 mx-4" />;
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[16px] border border-neutral-200/60 overflow-hidden shadow-xs divide-y divide-neutral-100">
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AccountPage() {
  const router = useRouter();

  const { data: me, isError: meError } = useQuery({
    queryKey: ["me"],
    queryFn: getUser,
  });

  // redirect if unauthenticated
  useEffect(() => {
    if (meError) router.push("/auth/login/start");
  }, [meError, router]);

  const name: string = me?.data?.user?.name ?? "";
  const institution: string = me?.data?.user?.institution ?? "";
  const memberSince: string = me?.data?.user?.created_at
    ? new Date(me.data.user.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";
  const userId: string = me?.data?.user?.id ?? name;
  const colorClass = getColorClass(userId);

  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/auth/login/start";
  };

  return (
    <div
      className={`max-w-md mx-auto bg-neutral-50 min-h-dvh flex flex-col w-full pb-28 select-none ${inter.className}`}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-neutral-50 px-6 pt-6 pb-3 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-[38px] h-[38px] rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 active:scale-95 transition-all shadow-xs cursor-pointer shrink-0"
          aria-label="Go back"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1F2937"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1
          className={`text-[18px] font-bold text-neutral-900 tracking-tight ${dm_sans.className}`}
        >
          Account
        </h1>
      </div>

      <div className="flex-1 px-6">
        {/* ── Profile card ─────────────────────────────────────────── */}
        <div className="relative grainy bg-[#ffdf41] rounded-[22px] p-5 shadow-sm overflow-hidden">
          <div className="flex items-center gap-4">
            {/* Avatar circle */}
            <div className="w-[70px] h-[70px] rounded-full border-[3px] border-black/20 bg-neutral-800 flex items-center justify-center font-bold text-[22px] text-white shrink-0 select-none overflow-hidden shadow-sm">
              {name ? getInitials(name) : "?"}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pr-6">
              <p
                className={`text-[17px] font-bold text-black leading-tight truncate ${dm_sans.className}`}
              >
                {name || "—"}
              </p>
              {institution && (
                <p className="text-[12px] text-black/60 font-semibold mt-0.5 truncate">
                  {institution}
                </p>
              )}

              {/* Tribe pills */}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full border border-black/30 text-[11px] font-semibold text-black/80 bg-transparent">
                  Tech tribe
                </span>
                <span className="px-2.5 py-0.5 rounded-full border border-black/20 text-[11px] font-semibold text-black/70 bg-[#D0BD21]/30">
                  Creative Tribe
                </span>
              </div>

              {memberSince && (
                <p className="text-[11px] text-black/55 font-semibold mt-2">
                  Member since {memberSince}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Notifications ─────────────────────────────────────────── */}
        <SectionLabel label="Notifications" />
        <Card>
          <ToggleRow
            label="Email"
            enabled={emailNotif}
            onToggle={() => setEmailNotif((v) => !v)}
          />
          <ToggleRow
            label="Push Notifications"
            enabled={pushNotif}
            onToggle={() => setPushNotif((v) => !v)}
          />
        </Card>

        {/* ── Security ──────────────────────────────────────────────── */}
        <SectionLabel label="Security" />
        <Card>
          <ChevronRow label="Change PIN" />
          <ChevronRow label="Reset PIN" />
        </Card>

        {/* ── Support ───────────────────────────────────────────────── */}
        <SectionLabel label="Support" />
        <Card>
          <ChevronRow label="FAQs" onClick={() => router.push("/faqs")} />
          {/* Feedback row — with subtitle */}
          <Link
            href="https://forms.gle/Bq2HKZnRvS3mH8XM7"
            target="_blank"
            className="w-full flex items-center justify-between py-3.5 px-4 bg-white hover:bg-neutral-50 transition-colors cursor-pointer active:scale-[0.99]"
          >
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-[14px] font-semibold text-neutral-800">
                Feedback
              </span>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 ml-3"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
          <Link href="https://wa.link/4u169w" target="_blank">
            <ChevronRow label="Chat With Us" />
          </Link>
        </Card>
      </div>

      {/* ── Log out ───────────────────────────────────────────────────── */}
      <div className="px-6 pt-4 pb-2">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[14px] text-[14px] font-bold text-neutral-600 hover:text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer active:scale-[0.98] border border-transparent hover:border-red-100"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log out
        </button>
      </div>
    </div>
  );
}
