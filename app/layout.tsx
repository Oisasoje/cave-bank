import type { Metadata } from "next";
import { Toaster } from "sonner";

import { Geist, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

import { ClientProviders } from "@/components/ClientProviders";

import HomePageFloatingNav from "@/components/HomePageFloatingNav";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cave Bank",
  description: "Banking built for you",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${dmSans.variable} ${spaceMono.variable} font-sans ${geist.variable}`}
    >
      <ClientProviders>
        <body className="min-h-full flex flex-col">
          {children}
          <HomePageFloatingNav />
          <Toaster
            position="top-right"
            duration={4000}
            richColors
            closeButton
            expand={false}
            visibleToasts={3}
            gap={8}
          />
        </body>
      </ClientProviders>
    </html>
  );
}
